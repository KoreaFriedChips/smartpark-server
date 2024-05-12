import { verifyToken } from '@clerk/backend';
import { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { ZodObject, ZodSchema } from 'zod';
import { PrismaClient } from '@prisma/client/edge.js';
const prisma = new PrismaClient();

const CLERK_PUBLIC = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvbidMoSkE1q5XWk3wb7D\nsZB4DxUMJgcPv2Q+e33STEn8rwrytk/fHrz8XGPMouAqNUOJnUMGOmC+LLKMc2Rm\n0kwbn4j16J4kaSrE+e60r0m2eecX/JBxKIFllEWK2Gk3NEZ1SJyL58XZHAVBDIO9\nvx1pECsFxWI7MdluyRCOaa3jjaeQSck0WGl3oiBx3KJ7e9a2/QDNJX5XGq19J4qm\nHVPTYvotXk7RcomAVGXZTgROUAtce2p7FSycyQeIweo1CmIEKjJTOQc427GExVns\nKV5sgLjqpGDHy2z6ozMHZn6FFM4fLNUop1d1MNdi6cKecGFxdxJfRrHixlv4XEIk\n4wIDAQAB\n-----END PUBLIC KEY-----"

export const getUser = async (req: Request) => {
    try {
        const payload = await verifyToken(req.headers.get("token") ?? "", { jwtKey: CLERK_PUBLIC ?? "", issuer: null });
        console.log(payload);
        const userId = await getUserId(payload);
        return { payload, userId };
      } catch (err) {
        console.log(err);
        return {
          userId: undefined,
          payload: undefined
        };
    }
}

const getUserId = async (payload: JwtPayload): Promise<string | null> => {
  const user = await prisma.user.findFirst({ where: { clerkId: payload.sub}})
  if (!user) return null;
  return user.id;
}

export const tryOrReturnError = async (fn: () => Promise<NextResponse>) => {
  try {
    return await fn();
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal Server Error"}, {status:500});
  }
}

export const searchParamsToJSON = (searchParams: URLSearchParams) => {
    let searchParamsJSON: any = {};
    searchParams.forEach((val, key) => {
        searchParamsJSON[key] = val;
    });
    return searchParamsJSON;
}

export const PrismaPOST = async (
    data: any,
    prismaModel: any
) => {
  try {
    const createdObject = await prismaModel.create({
      data: data
    });

    return NextResponse.json({ data: createdObject });

  } catch (error) {
    console.log("POST failed");
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

export const PrismaGET = async (
    searchParams: URLSearchParams,
    partialSchema: ZodSchema,
    prismaModel: any
) => {
  try {
    const whereParams = partialSchema.safeParse(searchParamsToJSON(searchParams));
    if (!whereParams.success) {
      return NextResponse.json({ error: "Invalid search params"}, {status:400});
    }
    const objects = await prismaModel.findMany({ where: whereParams.data });
    return NextResponse.json({ data: objects });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}

export const PrismaPUT = async (
  req: NextRequest,
  { params }: { params: { id: string }},
  partialSchema: ZodSchema,
  prismaModel: any,
  userIdPropName: string | null | undefined = undefined
) => {
  try {
    const {userId, payload} = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    const updateParse = await partialSchema.safeParseAsync(await req.json());
    if (!updateParse.success) {
      return NextResponse.json({ error: "Invalid update data"}, {status:400});
    }

    // const payload = await getUser(data);
    // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })  }

    if (!params.id) {
      return NextResponse.json({ error: "id required" }, {status:400});
    }

    let object = await prismaModel.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!object) {
      return NextResponse.json({ error: "id not found"}, {status:400});
    }

    if ((userIdPropName === undefined && object['userId'] !== userId) ||
        (userIdPropName && object[userIdPropName] !== userId)) {
      return NextResponse.json({ error: "object does not belong to userId"}, {status:403});
    }

    await prismaModel.update({
      where: {
        id: params.id,
      },
      data: updateParse.data
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    return NextResponse.json({ error: "Internal server error"}, {status:500});
  }
}

export const PrismaDELETE = async (
  req: NextRequest,
  { params }: {params: { id: string}},
  prismaModel: any,
  userIdPropName: string | null | undefined = undefined
) => {
  try {
    const {userId, payload} = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    if (!params.id) {
      return NextResponse.json({ error: "id required"}, {status:400});
    }

    const object = await prismaModel.findUnique({
      where: {
        id: params.id
      }
    });

    if (!object) {
      return NextResponse.json({error: "id not found"}, {status:400});
    }

    if ((userIdPropName === undefined && object['userId'] !== userId) ||
        (userIdPropName && object[userIdPropName] !== userId)) {
      return NextResponse.json({ error: "object does not belong to userId"}, {status:403});
    }

    await prismaModel.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("delete failed");
    console.log(error);
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
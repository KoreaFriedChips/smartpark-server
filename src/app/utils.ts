import { verifyToken } from '@clerk/backend';
import { NextRequest, NextResponse } from 'next/server';
import { ZodObject, ZodSchema } from 'zod';

export const getUser = async (token: string) => {
    try {
        return await verifyToken(token, { jwtKey: process.env.CLERK_PUBLIC ?? "", issuer: null });
    } catch {
        return null;
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
    req: NextRequest,
    prismaModel: any
) => {
  try {
    const token = req.headers.get("token") ?? "";
    const payload = await getUser(token);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    let data = await req.json();
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
    req: NextRequest,
    partialSchema: ZodSchema,
    prismaModel: any
) => {
  try {
    const token = req.headers.get("token") ?? "";
    const payload = await getUser(token);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    const whereParams = partialSchema.safeParse(searchParamsToJSON(req.nextUrl.searchParams));
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
  prismaModel: any
) => {
  try {
    const token = req.headers.get("token") ?? "";
    const payload = await getUser(token);
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

    const object = await prismaModel.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!object) {
      return NextResponse.json({ error: "id not found"}, {status:400});
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
  prismaModel: any
) => {
  try {
    const token = req.headers.get("token") ?? "";
    const payload = await getUser(token);
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
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser, tryOrReturnError } from "@/app/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string, filename: string }}
) => {
  return tryOrReturnError(async () => {
    if (!params.slug || !params.filename) {
      return NextResponse.json({error: "userId and filename required"}, {status:400});
    }
    
    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const obj = await imgBucket.get(`${params.filename}`);
    if (!obj) {
      return NextResponse.json({error: "image not found"}, {status:404})
    }

    return new NextResponse(await obj.blob(), { headers: [['etag', obj.httpEtag]] });
  });
}


export const HEAD = async (
  req: NextRequest,
  {params} : { params : { slug: string, filename: string } }
) => {
  const userId = params.slug;
  if (!userId || !params.filename) {
    return NextResponse.json({error: "userId and filename required"}, {status:400});
  }
  const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
  const obj = await imgBucket.head(`${userId}/${params.filename}`);
  if (!obj) {
    return NextResponse.json({error: "image not found"}, {status: 404});
  }
  return new NextResponse();
}

export const DELETE = async (
req: NextRequest,
{params} : { params : { slug: string, filename: string } }
) => {
  return tryOrReturnError(async () => {
    const userId = params.slug;
    const { userId: curUserId, payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
    if (!curUserId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

    if (curUserId != userId) return NextResponse.json({error: "image belongs to another user"}, {status:400});

    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${userId}/${params.filename}`
    await imgBucket.delete(key);
    return NextResponse.json({message: "success"});
  });
}

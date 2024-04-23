import { NextRequest, NextResponse } from "next/server";
import { PrismaGET, PrismaPOST, getUser, tryOrReturnError } from "@/app/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { filename: string }}
) => {
  return tryOrReturnError(async () => {
    const { userId, payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
    if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${userId}/${params.filename}`
    const obj = await imgBucket.put(key, req.body, {
      httpMetadata: req.headers
    });
    return NextResponse.json({data: obj});
  });
}


export const DELETE = async (
req: NextRequest,
{params} : { params : { userId: string, filename: string } }
) => {
  return tryOrReturnError(async () => {
    const { userId, payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
    if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${userId}/${params.filename}`
    await imgBucket.delete(key);
    return NextResponse.json({message: "success"});
  });
}
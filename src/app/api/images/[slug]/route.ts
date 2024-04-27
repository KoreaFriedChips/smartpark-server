import { NextRequest, NextResponse } from "next/server";
import { PrismaGET, PrismaPOST, getUser, tryOrReturnError } from "@/app/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { R2HTTPMetadata, FixedLengthStream } from "@cloudflare/workers-types";
export const PUT = async (
    req: NextRequest,
    { params }: { params: { slug: string }}
) => {
  return tryOrReturnError(async () => {
    const filename = params.slug;
    const { userId, payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
    if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${userId}/${filename}`
    const headers: R2HTTPMetadata = {
      contentType: req.headers.get("content-length") || undefined
    }
    const obj = await imgBucket.put(key, await req.blob(), { httpMetadata: headers});
    console.log(obj);
    return NextResponse.json({data: obj});
  });
}

export const HEAD = async (
  req: NextRequest,
  {params} : { params : { slug: string } }
) => {
  const filename = params.slug
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

  if (!filename) {
    return NextResponse.json({error: "filename required"}, {status:400});
  }
  const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
  const obj = await imgBucket.head(`${userId}/${filename}`);
  if (!obj) {
    return NextResponse.json({error: "image not found"}, {status: 404});
  }
  return new NextResponse();
}

export const DELETE = async (
req: NextRequest,
{params} : { params : { slug: string } }
) => {
  return tryOrReturnError(async () => {
    const filename = params.slug;
    const { userId, payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
    if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});

    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${userId}/${filename}`
    await imgBucket.delete(key);
    return NextResponse.json({message: "success"});
  });
}
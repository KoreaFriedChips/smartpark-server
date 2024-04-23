import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { PrismaGET, PrismaPOST, getUser, tryOrReturnError } from "@/app/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";


export const PUT = async (
    req: NextRequest,
    { params }: { params: { userId: string, filename: string }}
) => {
  return tryOrReturnError(async () => {
    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const key = `${params.userId}/${params.filename}`
    const obj = await imgBucket.put(key, req.body, {
      httpMetadata: req.headers
    });
    return NextResponse.json({data: obj});
  });
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string, filename: string }}
) => {
  return tryOrReturnError(async () => {
    if (!params.userId || !params.filename) {
      return NextResponse.json({error: "userId and filename required"}, {status:400});
    }
    
    const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
    const obj = await imgBucket.get(`${params.userId}/${params.filename}`);
    if (!obj) {
      return NextResponse.json({error: "image not found"}, {status:404})
    }
  
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set('etag', obj.httpEtag);
    const status = obj.body ? 200 : 304;
  
    return new NextResponse(obj.body, { headers, status});
  });
}


export const HEAD = async (
  req: NextRequest,
  {params} : { params : { userId: string, filename: string } }
) => {
  if (!params.userId || !params.filename) {
    return NextResponse.json({error: "userId and filename required"}, {status:400});
  }
  const imgBucket: R2Bucket = getRequestContext().env.IMG_BUCKET;
  const obj = await imgBucket.head(`${params.userId}/${params.filename}`);
  if (!obj) {
    return NextResponse.json({error: "image not found"}, {status: 404});
  }
  return new NextResponse();
}

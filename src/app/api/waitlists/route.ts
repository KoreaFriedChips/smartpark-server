import { getUser, PrismaGET, searchParamsToJSON } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { WaitlistModel } from "@zod-prisma";
import { z } from "zod";


const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    const data = await req.json();
    try {
      const entry = await prisma.waitlist.findUnique({
        where: { email: data.email },
      });

      if (entry) {
        return NextResponse.json({ error: "Email already exists in the waitlist" }, { status: 400 });
      }

      const waitlist: z.infer<typeof WaitlistModel> = await prisma.$transaction(async (prisma) => {
    
        const waitlistEntry: Waitlist = await prisma.waitlist.create({
          data: {
            name: data.name,
            email: data.email,
          },
        });

        return waitlistEntry;
      });

      return NextResponse.json({ data: waitlist });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to save to database" }, { status: 500 });
    }
}

export const GET = async (
  req: NextRequest
) => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  return PrismaGET(req.nextUrl.searchParams, WaitlistModel.partial(), prisma.waitlist);
}
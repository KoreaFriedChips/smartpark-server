import { getUser, searchParamsToJSON } from "@/app/utils";
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
        const highestEntry = await prisma.waitlist.findFirst({
          orderBy: { place: "desc" },
        });
    
        let highestPlace = highestEntry && highestEntry.place != null ? highestEntry.place : 0;
        highestPlace += 1;
    
        const waitlistEntry: Waitlist = await prisma.waitlist.create({
          data: {
            name: data.name,
            email: data.email,
            place: highestPlace,
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
  // const data = await req.json();
  // const payload = await getUser(data);
  // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })
    
  try {
    const whereParams = WaitlistModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    console.log(whereParams);
    const waitlists = await prisma.waitlist.findMany({ where: whereParams });
    return NextResponse.json({ data: waitlists });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
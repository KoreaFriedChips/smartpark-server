import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { string, z } from "zod";
import { UserModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const user: User = await prisma.user.create({
        data: data
      });

      return NextResponse.json({ data: user });

    } catch (error) {
      console.log("Create user failed");
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams = UserModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const users = await prisma.user.findMany({ where: whereParams });
    return NextResponse.json({ data: users });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}


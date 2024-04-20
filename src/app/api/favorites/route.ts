import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { FavoriteModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const favorite: Favorite = await prisma.favorite.create({
        data: data
      });

      return NextResponse.json({ data: favorite });

    } catch (error) {
      console.log("Create favorite failed");
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams = FavoriteModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const favorites = await prisma.favorite.findMany({ where: whereParams });
    return NextResponse.json({ data: favorites });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}


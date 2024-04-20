import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
import { searchParamsToJSON } from "@/app/utils";
import { TransactionModel } from "@zod-prisma";

const prisma = new PrismaClient();

export const POST = async (
    req: NextRequest
) => {
    try {
      const data = await req.json();
      // const payload = await getUser(data);
      // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

      const transaction: Transaction = await prisma.transaction.create({
        data: data
      });

      return NextResponse.json({ data: transaction });

    } catch (error) {
      console.log("Create transaction failed");
      return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}

export const GET = async (
    req: NextRequest
) => {
  try {
    const whereParams = TransactionModel.partial().parse(searchParamsToJSON(req.nextUrl.searchParams));
    const transactions = await prisma.transaction.findMany({ where: whereParams });
    return NextResponse.json({ data: transactions });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({error: "Internal server error"}, {status:500});
  }
}


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge.js";
const prisma = new PrismaClient();

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {

  try {
    const data = await req.json();
    // const payload = await getUser(data);
    // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })  }

    if (!params.id) {
      return NextResponse.json({ error: "Transaction id required" }, {status:400});
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction id not found "}, {status:400});
    }

    await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: data
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    return NextResponse.json({ error: "Internal server error"}, {status:500});
  }
}

export const DELETE = async (
    req: NextRequest,
    {params}: {params: { id: string } }
) => {
  try {
    // const data = await req.json();
    // const payload = await getUser(data);
    // if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });

    if (!params.id) {
      return NextResponse.json({ error: "Transaction id required"}, {status:400});
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.id
      }
    });

    if (!transaction) {
      return NextResponse.json({error: "Transaction id not found"}, {status:400});
    }

    await prisma.transaction.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("Transaction delete failed");
    console.log(error);
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
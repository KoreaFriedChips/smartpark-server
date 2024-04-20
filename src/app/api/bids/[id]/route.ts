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
      return NextResponse.json({ error: "Bid id required" }, {status:400});
    }

    const bid = await prisma.bid.findFirst({
      where: {
        id: params.id,
      }
    });

    console.log(bid);

    if (!bid) {
      return NextResponse.json({ error: "Bid id not found "}, {status:400});
    }

    await prisma.bid.update({
      where: {
        id: params.id,
      },
      data: data
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log(error);
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
      return NextResponse.json({ error: "Bid id required"}, {status:400});
    }

    const bidParse = await prisma.bid.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!bidParse) {
      return NextResponse.json({ error: "Bid id not found "}, {status:400});
    }

    await prisma.bid.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("Bid delete failed");
    console.log(error);
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
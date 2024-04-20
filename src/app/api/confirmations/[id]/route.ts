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
      return NextResponse.json({ error: "Confirmation id required" }, {status:400});
    }

    const confirmation = await prisma.confirmation.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!confirmation) {
      return NextResponse.json({ error: "Confirmation id not found "}, {status:400});
    }

    await prisma.confirmation.update({
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
      return NextResponse.json({ error: "Confirmation id required"}, {status:400});
    }

    const confirmation = await prisma.confirmation.findUnique({
      where: {
        id: params.id
      }
    });

    if (!confirmation) {
      return NextResponse.json({error: "Confirmation id not found"}, {status:400});
    }

    await prisma.confirmation.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("Confirmation delete failed");
    console.log(error);
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
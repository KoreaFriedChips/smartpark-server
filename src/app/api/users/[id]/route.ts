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
      return NextResponse.json({ error: "User id required" }, {status:400});
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User id not found "}, {status:400});
    }

    await prisma.user.update({
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
      return NextResponse.json({ error: "User id required"}, {status:400});
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    });

    if (!user) {
      return NextResponse.json({error: "User id not found"}, {status:400});
    }

    await prisma.user.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("User delete failed");
    console.log(error);
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
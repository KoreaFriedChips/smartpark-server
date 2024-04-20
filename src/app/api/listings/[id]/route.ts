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
      return NextResponse.json({ error: "Listing id required" }, {status:400});
    }

    const listing = prisma.listing.findUnique({
      where: {
        id: params.id,
      }
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing id not found "}, {status:400});
    }

    await prisma.listing.update({
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
      return NextResponse.json({ error: "Listing id required"}, {status:400});
    }

    const listing = prisma.listing.findUnique({
      where: {
        id: params.id
      }
    });

    if (!listing) {
      return NextResponse.json({error: "Listing id not found"}, {status:400});
    }

    await prisma.listing.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: "success"});
  } catch (error) {
    console.log("Listing delete failed");
    return NextResponse.json({ error: "Internal Server error"}, {status:500});
  }
}
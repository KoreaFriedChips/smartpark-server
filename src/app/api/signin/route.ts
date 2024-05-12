import { getUser } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* 
Protected route

- token

*/

export const POST = async (req: NextRequest) => {
    const { payload, userId } = await getUser(req);
    if (!payload)
        return NextResponse.json({ error: "Bad JWT" }, { status: 403 });

    if (!userId)
        return NextResponse.json({ error: "clerkId not found" }, { status: 404 });

    return NextResponse.json({ message: "success" });
};

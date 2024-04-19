import { getUser } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";

/* 
Protected route

- token
- birthday
- email
- name
- phone number

*/
export const POST = async (
    req: NextRequest
) => {
    const data = await req.json();
    const payload = await getUser(data);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    
    return NextResponse.json({message: payload});
}
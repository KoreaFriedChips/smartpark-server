import { getUser } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* 
Protected route

- token
- birthday
- email
- name
- phone number

*/

const schema = z.object({
    token: z.string({
        required_error: "token is required"
    }),
    birthday: z.string({
        required_error: "birthday is required"
    }).datetime({
        message: "birthday must be UTC"
    }),
    email: z.string({
        required_error: "email is required"
    }),
    name: z.string({
        required_error: "name is required"
    }),
    phoneNumber: z.string({
        required_error: "phoneNumber is required"
    })
});

export const POST = async (
    req: NextRequest
) => {
    const parse = await schema.safeParseAsync(await req.json());
    console.log(parse);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.issues.map((issue) => issue.message)}, { status: 400 });
    }
    const payload = await getUser(parse.data);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 })

    
    return NextResponse.json({message: payload});
}
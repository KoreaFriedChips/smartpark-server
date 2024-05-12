import { getUser } from "@/app/utils";
import { verifyToken } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from '@prisma/client/edge.js';
const prisma = new PrismaClient();

/* 
Protected route

- token

*/

const schema = z.object({
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
    const { payload } = await getUser(req);
    if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });

    const parse = await schema.safeParseAsync(await req.json());
    console.log(parse);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.issues.map((issue) => issue.message)}, { status: 400 });
    }

    prisma.user.create({
        data: {
            clerkId: payload.sub,
            name: parse.data.name,
            email: parse.data.email,
            phoneNumber: parse.data.phoneNumber,
            birthday: parse.data.birthday
        }
    });

    return NextResponse.json({message: "success"});
}
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client/edge.js";
import { cookies, headers } from "next/headers";
const prisma = new PrismaClient();
const schema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be 50 characters or fewer"),
  email: z.string().email("Invalid email").max(254, "Email must be 254 characters or fewer"),
});

export async function formSubmit(prevState: any, formData: FormData) {
  const lastSubmission = cookies().get("submission");
  const currentTime = Date.now();
  const submissionTimeout = 60000;

  if (lastSubmission && currentTime - Number(`${lastSubmission}`) < submissionTimeout) {
    return {
      message: "error",
      error: `Please wait before next submission`,
    };
  }

  const data = {
    name: String(formData.get("name")),
    email: String(formData.get("email")).toLowerCase(),
    hidden: formData.get("catch"),
    refIp: headers().get("CF-Connecting-IP"),
    refLoc: String(formData.get("ref"))
  };

  const validatedFields = schema.safeParse({
    email: data.email,
    name: data.name,
    hidden: data.hidden,
  });

  if (data.hidden) {
    cookies().set("name", `Error submitting`);
    cookies().set("email", `Error submitting`);
    return {
      message: "error",
      error: `Error detected`,
    };
  }

  if (!validatedFields.success) {
    return {
      message: "error",
      error: `Error: Invalid fields`,
    };
  }

  try {
    const entry = await prisma.waitlist.findUnique({
      where: { email: data.email },
    });

    if (entry) {
      return {
        message: "error",
        error: "Email already exists in the waitlist",
      };
    }


    await prisma.$transaction(async (prisma) => {
  
      await prisma.waitlist.create({
        data: {
          name: data.name,
          email: data.email,
          refLoc: data.refLoc,
          refIp: data.refIp
        },
      });
    });
  } catch (error) {
    console.log(error);
    return {
      message: "error",
      error: "Failed to save to database. Please try again later",
    };
  }

  cookies().set("submission", `${currentTime}`);
  cookies().set("name", `${data.name}`);
  cookies().set("email", `${data.email}`);

  return {
    message: "success",
    name: `${data.name}`,
    email: `${data.email}`,
    error: "",
  };
}

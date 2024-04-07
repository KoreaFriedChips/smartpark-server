"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import mongoose from "mongoose";
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
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

  cookies().set("submission", `${currentTime}`);
  
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    hidden: formData.get("catch"),
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

  cookies().set("name", `${data.name}`);
  cookies().set("email", `${data.email}`);

  return {
    message: "success",
    name: `${data.name}`,
    email: `${data.email}`,
    error: "",
  };
}

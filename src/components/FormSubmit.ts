"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import Waitlist from "@/models/Waitlist";
import WaitlistCounter from "@/models/WaitlistCounter";
import dbConnect from "@/utils/mongodb";
const schema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be 50 characters or fewer"),
  email: z.string().email("Invalid email").max(254, "Email must be 254 characters or fewer"),
});

export async function formSubmit(prevState: any, formData: FormData) {
  await dbConnect();

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

  const entry = await Waitlist.findOne({ email: data.email });
  if (entry) {
    return {
      message: "error",
      error: "Email already exists in the waitlist",
    };
  }

  try {
    const counter = (await WaitlistCounter.findOne()) || new WaitlistCounter({ count: 1 });
    counter.count += 1;
    await counter.save();

    const waitlistEntry = new Waitlist({
      name: data.name,
      email: data.email,
      place: counter.count,
    });
    await waitlistEntry.save();
  } catch (error) {
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

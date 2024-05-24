import { sendNotification } from "@/lib/notification"
import { NextResponse } from "next/server";


export const POST = async () => {
  await sendNotification("66230584ddc584af3e0a0770", "Nearby spots available", "5 parking spots are available near your current location");
  return new NextResponse();
}
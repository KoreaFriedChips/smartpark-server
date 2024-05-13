import { tryOrReturnError } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/app/utils";

export const GET = async (
  req: NextRequest
) => {
return tryOrReturnError(async () => {
  const { userId, payload } = await getUser(req);
  if (!payload) return NextResponse.json({ error: "Bad JWT" }, { status: 403 });
  if (!userId) return NextResponse.json({error: "clerkId not found"}, {status: 400});
  const data: any = req.nextUrl.searchParams;
  if (!data.has('input')) return NextResponse.json({error: "params must include input"}, {status: 400});
  const googleUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  const searchParams = new URLSearchParams([
    ['fields', 'geometry'],
    ['input', data.get('input')],
    ['inputtype', 'textquery'],
    ['key', process.env.GOOGLE_MAPS_API_KEY],
  ]);

  const res = await fetch(googleUrl + "?" + searchParams);
  if (res.status != 200) return NextResponse.json({error: "google maps api call failed"}, {status: 500});
  const googleMapsData: any = await res.json();
  const googleMapsLocation = googleMapsData.candidates[0].geometry.location;
  const location = {
    latitude: googleMapsLocation.lat,
    longitude: googleMapsLocation.lng,
  }
  return NextResponse.json({data: location});
})}
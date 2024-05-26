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
  const latitude = req.nextUrl.searchParams.get('latitude');
  const longitude = req.nextUrl.searchParams.get('longitude');
  if (!latitude || !longitude) return NextResponse.json({error: "must include latitude and longitude"}, {status: 400});

  const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?"
  const searchParams = new URLSearchParams([
    ['key', process.env.GOOGLE_MAPS_API_KEY as string],
    ['result_type', 'locality'],
    ['latlng', `${latitude},${longitude}`]
  ]);

  console.log(googleUrl+searchParams);
  const res = await fetch(googleUrl + searchParams);
  if (res.status != 200) return NextResponse.json({error: "google maps api call failed"}, {status: 500});
  const googleMapsData: any = await res.json();
  if (googleMapsData.results.length === 0) throw new Error("google maps api call failed");

  const addressComponents: any[] = googleMapsData.results[0].address_components;
  const locality = addressComponents.find((value) => value.types[0] === 'locality');
  const city = locality.long_name;
  const admin_area = addressComponents.find((value) => value.types[0] === 'administrative_area_level_1');
  const state = admin_area.short_name;
  console.log(googleMapsData, city, state);
  return NextResponse.json({data: {city, state}});
})}
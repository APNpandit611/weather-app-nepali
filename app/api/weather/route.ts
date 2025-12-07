import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const WEATHERSTACK_KEY = process.env.NEXT_PUBLIC_WEATHERSTACK_KEY; // server-only
  const weatherRes = await fetch(
    `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${lon}&units=m`
    // `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=Chicago&units=m`
  );

  const data = await weatherRes.json();
  return NextResponse.json(data);


}
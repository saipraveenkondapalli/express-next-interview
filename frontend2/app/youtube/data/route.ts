import youtubeService from "@/app/services/youtube";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";
  const data = await youtubeService.getVideos(name);

  return NextResponse.json(data);
}

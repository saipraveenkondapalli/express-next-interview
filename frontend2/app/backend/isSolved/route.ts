import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/app/services/api";

export const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const slug = new URL(req.url).searchParams.get("slug");

  const { accessToken } = await getAccessToken();

  const res = await api.get("/api/private/progress/is-solved/" + slug, {
    params: {
      slug: slug,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(res.data);
});

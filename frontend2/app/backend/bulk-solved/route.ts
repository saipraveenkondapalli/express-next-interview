import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/app/services/api";

const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const slugs = new URL(req.url).searchParams.getAll("slugs[]");

  const nextResponse = new NextResponse();
  const userSession = await getSession(req, nextResponse);
  const accessToken = userSession?.accessToken;

  const res = await api.get("/api/private/progress/bulk-are-solved", {
    params: {
      slugs: slugs,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(res.data);
});

export { GET };

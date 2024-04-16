import { NextRequest, NextResponse } from "next/server";
import { api } from "@/app/services/api";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const PUT = withApiAuthRequired(async function PUT(req: NextRequest) {
  const slug = new URL(req.url).searchParams.get("slug");

  const response = new NextResponse();

  const user = await getSession(req, response);
  const accessToken = user?.accessToken;

  const res = await api.put(
    "/api/private/progress/add-problem/" + slug,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return NextResponse.json(res.data);
});

export { PUT };

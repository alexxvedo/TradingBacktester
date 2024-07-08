import { NextResponse } from "next/server";

export async function POST(req) {
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0`,
    },
  });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

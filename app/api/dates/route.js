import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log("hola");

  try {
    const dates = await prisma.$queryRaw`
        SELECT DISTINCT DATE(timestamp) as date
        FROM datos
        ORDER BY date ASC
      `;

    console.log(dates);
    return new Response(JSON.stringify(dates.map((data) => data.date)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching dates" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

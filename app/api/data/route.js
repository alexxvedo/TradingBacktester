import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const url = new URL(req.url);
  const start = url.searchParams.get("start");
  let end = url.searchParams.get("end");

  if (!start || !end) {
    return new Response(JSON.stringify({ error: "Missing date parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Añadir un día a la fecha de end
  const endDate = new Date(end);
  endDate.setDate(endDate.getDate() + 1);
  end = endDate.toISOString();

  try {
    const data = await prisma.datos.findMany({
      where: {
        timestamp: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid token or server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

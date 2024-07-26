import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { startDate, endDate, currentCandleIndex } = await req.json();

    const updatedSession = await prisma.session.update({
      where: { id: parseInt(id) },
      data: {
        startDate,
        endDate,
        currentCandleIndex,
      },
    });

    return new Response(JSON.stringify(updatedSession), {
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
      },
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const sessionData = await prisma.session.findUnique({
      where: { id: parseInt(id) },
    });

    console.log(sessionData);
    return new Response(JSON.stringify(sessionData), {
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
      },
    );
  }
}

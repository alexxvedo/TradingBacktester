import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req) {
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
    const { sessionId, type, size, entryPrice, tp, sl, orderType, entryDate } =
      await req.json();

    const operation = await prisma.operation.create({
      data: {
        sessionId: parseInt(sessionId),
        type,
        size,
        entryPrice: entryPrice,
        sl: sl ? parseFloat(sl) : null,

        tp: tp ? parseFloat(tp) : null,
        orderType: orderType,
        entryDate: new Date(entryDate * 1000),
      },
    });

    return new Response(JSON.stringify(operation), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Invalid token or server error", error);
    return new Response(
      JSON.stringify({ error: "Invalid token or server error" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Nueva función para manejar GET y recuperar todas las operaciones
export async function GET(req) {
  const { userId } = await auth();
  if (!userId) {
    console.log("Unauthorized");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    const operations = await prisma.operation.findMany({
      where: { sessionId: parseInt(sessionId) },
    });

    return new Response(JSON.stringify(operations), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid token or server error" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

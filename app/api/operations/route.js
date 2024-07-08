import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const decoded = verify(session.user.token, process.env.JWT_SECRET);
    const { sessionId, type, size, entryPrice } = await req.json();

    const operation = await prisma.operation.create({
      data: {
        sessionId: parseInt(sessionId),
        type,
        size,
        entryPrice: entryPrice,
      },
    });

    return new Response(JSON.stringify(operation), {
      status: 201,
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
      }
    );
  }
}

// Nueva función para manejar GET y recuperar todas las operaciones
export async function GET(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const decoded = verify(session.user.token, process.env.JWT_SECRET);
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
      }
    );
  }
}

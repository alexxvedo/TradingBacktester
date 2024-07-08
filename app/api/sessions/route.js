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
    const { title, description, accountSize } = await req.json();

    const sesion = await prisma.session.create({
      data: {
        userId: decoded.userId,
        title,
        description,
        date: new Date(),
        time: new Date(),
        totalOperations: 0,
        profitLoss: 0.0,
        averageGain: 0.0,
        maxDrawdown: 0.0,
        winRate: 0.0,
        accountSize: parseFloat(accountSize),
        currentBalance: parseFloat(accountSize),
      },
    });

    return new Response(JSON.stringify(sesion), {
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

    const sessions = await prisma.session.findMany({
      where: { userId: decoded.userId },
    });

    return new Response(JSON.stringify(sessions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid token or server error, " + error }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

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
    const {
      title,
      description,
      accountSize,
      startDate,
      endDate,
      pair,
      timeframe,
      realistic,
    } = await req.json();
    const sesion = await prisma.session.create({
      data: {
        userId: userId,
        title,
        description,
        date: new Date(),
        time: new Date(),
        totalOperations: 0,
        profitLoss: 0.0,
        averageGain: 0.0,
        maxDrawdown: 0.0,
        winRate: 0.0,
        startDate,
        endDate,
        accountSize: parseFloat(accountSize),
        currentBalance: parseFloat(accountSize),
        currency: pair,
        interval: timeframe,
      },
    });

    return new Response(JSON.stringify(sesion), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Invalid token or server error: ", error);

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

export async function GET() {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const sessions = await prisma.session.findMany({
      where: { userId: userId },
    });

    return new Response(JSON.stringify(sessions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Invalid token or server error: ", error);

    return new Response(
      JSON.stringify({ error: "Invalid token or server error, " + error }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

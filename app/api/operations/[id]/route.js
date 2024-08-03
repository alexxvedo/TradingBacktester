import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

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
    const { order, type } = await req.json();

    var operation;

    if (type === "update") {
      operation = await prisma.operation.update({
        where: { id: parseInt(id) },
        data: {
          tp: parseFloat(order.tp),
          sl: parseFloat(order.sl),
        },
      });
    } else if (type === "close") {
      operation = await prisma.operation.update({
        where: { id: parseInt(id) },
        data: {
          exitPrice: order.exitPrice,
          profit: order.profit,
          tp: parseFloat(order.tp),
          sl: parseFloat(order.sl),
          exitDate: order.exitDate,
        },
      });
    }

    // Actualizar las métricas de la sesión
    const sessionId = operation.sessionId;
    const operations = await prisma.operation.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" }, // Ordenar por fecha de creación para el cálculo del drawdown
    });

    const totalOperations = operations.length;
    const profitLoss = operations.reduce(
      (acc, op) => acc + (op.profit || 0),
      0
    );
    const averageGain = totalOperations > 0 ? profitLoss / totalOperations : 0;
    const winRate =
      totalOperations > 0
        ? (operations.filter((op) => (op.profit || 0) > 0).length /
            totalOperations) *
          100
        : 0;

    // Calcular el maxDrawdown
    let maxDrawdown = 0;
    let peak = -Infinity;
    let cumulativeProfit = 0;

    for (const op of operations) {
      cumulativeProfit += op.profit || 0;
      if (cumulativeProfit > peak) {
        peak = cumulativeProfit;
      }
      const drawdown = peak - cumulativeProfit;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: {
        totalOperations,
        profitLoss,
        averageGain,
        maxDrawdown,
        winRate,
      },
    });

    return new Response(JSON.stringify(operation), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
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

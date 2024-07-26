import { PrismaClient as Historical1 } from "@prisma/clientHistorical1";
import { PrismaClient as Historical2 } from "@prisma/clientHistorical2";
import { PrismaClient as Historical3 } from "@prisma/clientHistorical3";
import { PrismaClient as Historical4 } from "@prisma/clientHistorical4";
import { auth } from "@clerk/nextjs/server";

const prismaHistorical1 = new Historical1();
const prismaHistorical2 = new Historical2();
const prismaHistorical3 = new Historical3();
const prismaHistorical4 = new Historical4();
/**
 * An async function that handles a GET request to retrieve unique dates from the 'datos' table
 * in multiple databases based on the mode and parameters.
 *
 * @param {Request} req - The request object
 * @return {Promise<Response>} A response with the unique dates in JSON format, or an error message.
 */
export async function GET(req) {
  // Get the user ID from the authenticated user
  const { userId } = await auth();

  // If user is not authenticated, return an error response
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Extract query parameters
  const url = new URL(req.url);
  const currency = url.searchParams.get("currency");
  const interval = url.searchParams.get("interval");
  const realisticMode = url.searchParams.get("realistic") === "true";

  if (!currency || !interval) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    let dates;
    if (realisticMode) {
      const [dates2, dates3, dates4] = await Promise.all([
        prismaHistorical2.historicalData.findMany({
          where: { currency, interval },
          select: { timestamp: true },
          distinct: ["timestamp"],
          orderBy: { timestamp: "asc" },
        }),
        prismaHistorical3.historicalData.findMany({
          where: { currency, interval },
          select: { timestamp: true },
          distinct: ["timestamp"],
          orderBy: { timestamp: "asc" },
        }),
        prismaHistorical4.historicalData.findMany({
          where: { currency, interval },
          select: { timestamp: true },
          distinct: ["timestamp"],
          orderBy: { timestamp: "asc" },
        }),
      ]);

      const combinedDates = [...dates2, ...dates3, ...dates4];
      dates = Array.from(
        new Set(combinedDates.map((data) => data.date)),
      ).sort();
    } else {
      console.log("Fetching...");
      dates = await prismaHistorical1.historicalData.findMany({
        where: { currency, interval },
        select: { timestamp: true },
        distinct: ["timestamp"],
        orderBy: { timestamp: "asc" },
      });
      dates = dates.map((data) => data.timestamp.toISOString().split("T")[0]);
      console.log(dates);
    }

    return new Response(JSON.stringify(dates), {
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

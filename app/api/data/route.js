import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

/**
 * Fetches data from the database based on the provided date range and pagination parameters.
 *
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<Response>} The response containing the fetched data.
 */
export async function GET(req) {
  // Fetch the authenticated user's ID
  const { userId } = await auth();

  // If the user is not authenticated, return an error response
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Extract the date range and pagination parameters from the request URL
  const url = new URL(req.url);
  const start = url.searchParams.get("start");
  let end = url.searchParams.get("end");
  const offset = parseInt(url.searchParams.get("offset")) || 0;
  const limit = parseInt(url.searchParams.get("limit")) || 2000;

  // If the date range parameters are missing, return an error response
  if (!start || !end) {
    return new Response(JSON.stringify({ error: "Missing date parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Add one day to the end date
  const endDate = new Date(end);
  endDate.setDate(endDate.getDate() + 1);
  end = endDate.toISOString();

  try {
    // Fetch data from the database based on the date range and pagination parameters
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
      skip: offset,
      take: limit,
    });

    console.log("Longitud: ", data.length);

    // Return the fetched data as a JSON response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // If there is an error while fetching the data, return an error response
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

import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

/**
 * An async function that handles a GET request to retrieve unique dates from the 'datos' table.
 *
 * @return {Promise<Response>} A response with the unique dates in JSON format, or an error message.
 */
export async function GET() {
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

  try {
    // Execute a raw SQL query to retrieve unique dates from the 'datos' table
    const dates = await prisma.$queryRaw`
        SELECT DISTINCT DATE(timestamp) as date
        FROM datos
        ORDER BY date ASC
      `;

    // Map the dates to only contain the 'date' property
    const uniqueDates = dates.map((data) => data.date);

    // Return a response with the unique dates in JSON format
    return new Response(JSON.stringify(uniqueDates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // If there is an error, return an error message
    return new Response(JSON.stringify({ error: "Error fetching dates" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

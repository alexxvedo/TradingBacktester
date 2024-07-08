import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  return new Response(
    JSON.stringify({ token, user: { id: user.id, email: user.email } }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

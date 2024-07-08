import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: "user",
    },
  });

  return new Response(JSON.stringify(user), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

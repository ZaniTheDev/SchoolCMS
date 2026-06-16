import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  console.log("requuest body : ", body);

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  //Find user
  const user = await prisma.users.findUnique({
    where: { username },
  });

  console.log("user found : ", user);
  //check if use exist
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // check if password exist
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  console.log("password valid : ", isPasswordValid);
  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Wrong password or username" },
      { status: 401 },
    );
  }

  // 5. Success response
  return NextResponse.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
    },
  });
}

import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Check if user has ADMIN role
    if (user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Access denied. Admin role required." },
        { status: 403 },
      );
    }

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...userWithoutPassword } = user;

    // Create response
    const response = new Response(
      JSON.stringify({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

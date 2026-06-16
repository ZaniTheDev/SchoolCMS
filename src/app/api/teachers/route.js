import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all teachers
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 100;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.teacher.count(),
    ]);

    return Response.json({
      success: true,
      data: {
        teachers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get teachers error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST create teacher
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { name, position, photo, bio } = await request.json();

    if (!name || !position) {
      return Response.json(
        { success: false, message: "Name and position are required" },
        { status: 400 },
      );
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        position,
        photo,
        bio,
      },
    });

    return Response.json(
      {
        success: true,
        data: teacher,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create teacher error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

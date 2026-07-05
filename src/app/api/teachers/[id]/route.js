import prisma from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET single teacher
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      return Response.json(
        { success: false, message: "Teacher not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error("Get teacher error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT update teacher
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const { name, position, photo, bio } = await request.json();

    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      return Response.json(
        { success: false, message: "Teacher not found" },
        { status: 404 },
      );
    }

    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        name: name || existingTeacher.name,
        position: position || existingTeacher.position,
        photo: photo || existingTeacher.photo,
        bio: bio || existingTeacher.bio,
      },
    });

    return Response.json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error("Update teacher error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE teacher
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      return Response.json(
        { success: false, message: "Teacher not found" },
        { status: 404 },
      );
    }

    await prisma.teacher.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error("Delete teacher error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

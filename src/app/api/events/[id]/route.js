import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET single event
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get event error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT update event
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
    const { title, description, date, image } = await request.json();

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title: title || existingEvent.title,
        description: description || existingEvent.description,
        date: date ? new Date(date) : existingEvent.date,
        image: image || existingEvent.image,
      },
    });

    return Response.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Update event error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE event
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

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

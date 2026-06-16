import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all events
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get("upcoming") === "true";
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const where = {};
    if (upcoming) {
      where.date = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: "asc" },
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: {
        events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get events error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST create event
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { title, description, date, image } = await request.json();

    if (!title || !description || !date) {
      return Response.json(
        {
          success: false,
          message: "Title, description, and date are required",
        },
        { status: 400 },
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        image,
      },
    });

    return Response.json(
      {
        success: true,
        data: event,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create event error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

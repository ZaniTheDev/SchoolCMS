import prisma from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all gallery images
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.galleryImage.count(),
    ]);

    return Response.json({
      success: true,
      data: {
        images,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get gallery error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST upload gallery image
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { imageUrl, caption } = await request.json();

    if (!imageUrl) {
      return Response.json(
        { success: false, message: "Image URL is required" },
        { status: 400 },
      );
    }

    const image = await prisma.galleryImage.create({
      data: {
        imageUrl,
        caption,
      },
    });

    return Response.json(
      {
        success: true,
        data: image,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Upload gallery image error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

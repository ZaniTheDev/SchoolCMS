import prisma from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DELETE gallery image
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

    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return Response.json(
        { success: false, message: "Image not found" },
        { status: 404 },
      );
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery image error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

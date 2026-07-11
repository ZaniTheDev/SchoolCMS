import prisma from "lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET single post
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT update post
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
    const { title, slug, content, thumbnail, publishedAt } =
      await request.json();

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    // Check if slug conflicts with another post
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug },
      });
      if (slugExists) {
        return Response.json(
          { success: false, message: "Slug already exists" },
          { status: 409 },
        );
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title || existingPost.title,
        slug: slug || existingPost.slug,
        content: content || existingPost.content,
        thumbnail: thumbnail || existingPost.thumbnail,
        publishedAt: publishedAt
          ? new Date(publishedAt)
          : existingPost.publishedAt,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Update post error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE post
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

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

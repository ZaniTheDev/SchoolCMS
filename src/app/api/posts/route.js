import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const where = {};
    if (published === "true") where.publishedAt = { not: null };
    if (published === "false") where.publishedAt = null;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST create new post
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { title, slug, content, thumbnail, publishedAt } =
      await request.json();

    if (!title || !slug || !content) {
      return Response.json(
        { success: false, message: "Title, slug, and content are required" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return Response.json(
        { success: false, message: "Slug already exists" },
        { status: 409 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        thumbnail,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json(
      {
        success: true,
        data: post,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create post error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

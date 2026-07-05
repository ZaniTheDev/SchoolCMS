import prisma from "lib/prisma";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";

// GET all posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const where = {};
    if (slug) where.slug = slug;
    if (published === "true") where.publishedAt = { not: null };
    if (published === "false") where.publishedAt = null;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          User: {
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

    let token = null;
    try {
      token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
    } catch (tokenError) {
      console.error("Get token error:", tokenError);
    }

    const role = token?.role;
    const email = token?.email;

    let authorId = token?.sub;

    // If authorId from token is set, verify the user exists
    if (authorId) {
      const userExists = await prisma.user.findUnique({ where: { id: authorId } });
      if (!userExists) {
        authorId = null; // invalidate and try other methods
      }
    }

    // Fall back to email lookup if no valid authorId
    if (!authorId && email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user?.id) {
        authorId = user.id;
      }
    }

    // Development fallback: find or create admin/dev user
    if (!authorId && process.env.NODE_ENV !== "production") {
      const fallbackAdmin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "asc" },
      });
      if (fallbackAdmin?.id) {
        authorId = fallbackAdmin.id;
      } else {
        const fallbackUser = await prisma.user.findFirst({
          orderBy: { createdAt: "asc" },
        });
        if (fallbackUser?.id) {
          authorId = fallbackUser.id;
        } else {
          const devEmail = email ?? "dev-admin@localhost.local";
          const existingDevUser = await prisma.user.findUnique({
            where: { email: devEmail },
          });
          if (existingDevUser?.id) {
            authorId = existingDevUser.id;
          } else {
            const hashedPassword = await bcrypt.hash(
              "dev-only-placeholder-password",
              10,
            );
            const createdFallbackUser = await prisma.user.create({
              data: {
                name: token?.name ?? "Developer Admin",
                email: devEmail,
                password: hashedPassword,
                role: "ADMIN",
              },
            });
            authorId = createdFallbackUser.id;
          }
        }
      }
    }

    if (process.env.NODE_ENV === "production" && role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!authorId) {
      return Response.json(
        {
          success: false,
          message:
            "User not found. Check session email/id and NEXTAUTH_SECRET.",
        },
        { status: 401 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        thumbnail,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId,
        updatedAt: new Date(),
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
      { success: false, message: error.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}

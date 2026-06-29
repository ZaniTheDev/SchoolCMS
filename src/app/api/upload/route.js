import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import cloudinary from "../../../../lib/cloudinary";

/**
 * POST /api/upload
 * Body: multipart/form-data
 *   - file: File (required)
 *   - folder: string (optional) — e.g. "thumbnails", "teachers", "gallery"
 *
 * Returns: { success: true, data: { url, public_id } }
 */
export async function POST(request) {
  // 1. Auth check — admin only
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "schoolcms";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan" },
        { status: 400 },
      );
    }

    // 2. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Stream buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `schoolcms/${folder}`,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
          max_bytes: 5 * 1024 * 1024, // 5MB limit
          quality: "auto:best", // ← add this
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error("[Upload Error]", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupload file" },
      { status: 500 },
    );
  }
}

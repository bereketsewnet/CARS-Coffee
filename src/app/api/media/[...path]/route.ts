import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

// This route serves dynamically-uploaded files from public/uploads/ in production.
// Next.js only serves files from `public/` that existed at BUILD TIME via its static
// manifest. Files uploaded after the build (e.g., team photos, partner logos) would
// return 404 from Next.js's static handler. This API route reads them directly from
// disk at request time, so uploads always work in production.

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;

    // Reconstruct the file path inside public/uploads/
    const uploadsRoot = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsRoot, ...segments);

    // Path-traversal protection — make sure resolved path stays inside uploadsRoot
    if (!filePath.startsWith(uploadsRoot + path.sep) && filePath !== uploadsRoot) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Check the file exists
    try {
      await stat(filePath);
    } catch {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    // Derive Content-Type from extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
    };
    const contentType = mimeMap[ext] ?? "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        // Cache for 1 year — the filename contains a timestamp so it's immutable
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[api/media] Error serving file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

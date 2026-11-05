import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifyBrochureDownloadToken } from "@/lib/brochure-token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file") || "";
  const token = searchParams.get("token") || "";

  if (!verifyBrochureDownloadToken(file, token)) {
    return NextResponse.json(
      {
        error:
          "Invalid or expired brochure download link. Please submit the brochure request form again.",
      },
      { status: 403 }
    );
  }

  const filePath = path.join(process.cwd(), "private", "brochures", file);
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}

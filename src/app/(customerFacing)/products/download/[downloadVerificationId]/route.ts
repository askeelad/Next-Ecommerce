import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const downloadInfo = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (downloadInfo == null) {
    return NextResponse.redirect(
      new URL("/products/download/expired", req.url)
    );
  }

  const { size } = await fs.stat(downloadInfo.product.filePath);
  const file = await fs.readFile(downloadInfo.product.filePath);
  const extension = downloadInfo.product.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${downloadInfo.product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}

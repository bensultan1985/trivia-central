import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import fs from "fs/promises";

export const runtime = "nodejs";

async function sha256OfFile(path: string): Promise<string | null> {
  try {
    const content = await fs.readFile(path, "utf8");
    return crypto.createHash("sha256").update(content, "utf8").digest("hex");
  } catch {
    return null;
  }
}

export async function GET() {
  const repoSchemaSha256 = await sha256OfFile("prisma/schema.prisma");
  const generatedSchemaSha256 = await sha256OfFile(
    "node_modules/.prisma/client/schema.prisma",
  );

  return NextResponse.json({
    ok: true,
    prismaClientVersion: Prisma.prismaVersion.client,
    repoSchemaSha256,
    generatedSchemaSha256,
  });
}

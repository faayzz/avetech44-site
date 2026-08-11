import { NextResponse } from "next/server";
import { readCatalog } from "@/lib/google-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await readCatalog();
  if (result.source === "error") return NextResponse.json(result, { status: 502 });
  return NextResponse.json(result);
}

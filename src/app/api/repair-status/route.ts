import { NextResponse } from "next/server";
import { lookupRepair } from "@/lib/google-repair";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { name?: string; locker?: string };
    const result = await lookupRepair(String(payload.name || ""), String(payload.locker || ""));
    if (!result.record) return NextResponse.json({ message: result.message }, { status: result.status || 500 });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Repair status error", error);
    return NextResponse.json({ message: "Le suivi est momentanément indisponible. Réessayez dans quelques secondes." }, { status: 503 });
  }
}

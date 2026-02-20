import { apiSuccess } from "@/lib/api";

export async function GET() {
  return Response.json(
    apiSuccess({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    })
  );
}

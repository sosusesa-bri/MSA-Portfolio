import { NextRequest } from "next/server";
import { z } from "zod";
import { apiSuccess, apiError, checkRateLimit, ErrorCodes } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`contact:${ip}`, 5, 60000)) {
      return apiError(
        ErrorCodes.RATE_LIMITED,
        "Too many requests. Please try again later.",
        429
      );
    }

    // CSRF check - validate origin
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ];
    if (origin && !allowedOrigins.some((o) => origin.startsWith(o))) {
      return apiError(ErrorCodes.VALIDATION_ERROR, "Invalid origin", 403);
    }

    // Parse and validate body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCodes.VALIDATION_ERROR,
        result.error.errors.map((e) => e.message).join(", "),
        400
      );
    }

    const { name, email, message } = result.data;

    // In production, you would send an email here
    // For now, we log the contact and return success
    console.log("Contact form submission:", { name, email, message });

    return Response.json(
      apiSuccess({ message: "Message received successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return apiError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred",
      500
    );
  }
}

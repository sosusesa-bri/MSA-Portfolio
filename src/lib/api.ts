// Standardized API response types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Error codes
export const ErrorCodes = {
  RATE_LIMITED: "RATE_LIMITED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
} as const;

// In-memory cache
const cache = new Map<string, { data: unknown; expiry: number }>();

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 1000 * 60 * 60 // default 1 hour
): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiry) {
    return cached.data as T;
  }

  const data = await fetcher();
  cache.set(key, { data, expiry: Date.now() + ttlMs });
  return data;
}

export function apiSuccess<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function apiError(
  code: string,
  message: string,
  status: number = 500
): Response {
  return Response.json(
    {
      success: false,
      error: { code, message },
    } as ApiErrorResponse,
    { status }
  );
}

// Rate limiter (simple in-memory for development)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

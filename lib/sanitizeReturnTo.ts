export function sanitizeReturnTo(
  value: unknown,
  fallback: string = "/dashboard",
): string {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();

  // Only allow same-origin, absolute paths.
  if (!trimmed.startsWith("/")) return fallback;
  if (trimmed.startsWith("//")) return fallback;

  return trimmed;
}

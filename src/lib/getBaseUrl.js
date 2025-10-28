// Returns an absolute origin you can safely use on the server (RSC/ISR/build)
export function getBaseUrl() {
  // Prefer an explicit site URL (with protocol)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Vercel provides VERCEL_URL without protocol
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  // Fallback to localhost for dev
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

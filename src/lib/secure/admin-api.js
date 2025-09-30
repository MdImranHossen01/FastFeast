export const blogPost = (token, pathname, req) => {
  // Protect /api/blogs routes
  if (pathname.startsWith("/api/blogs")) {
    // Allow only admin to POST
    if (req.method === "POST" && token.role !== "admin") {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};

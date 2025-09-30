import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { blogPost } from "./lib/secure/admin-api";

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  // admin api
  blogPost(token, pathname, req);

  return NextResponse.next();
}

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.search.includes("?page=result?")) {
    url.search = "?page=result"; // Perbaiki query string
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

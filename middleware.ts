import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const csp = [
  "default-src 'none';",
  "base-uri 'self';",
  "block-all-mixed-content;",
  "connect-src 'self';",
  "form-action 'self';",
  "frame-ancestors 'none';",
  "img-src 'self';",
  "manifest-src 'self';",  
  "media-src 'self';",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;",
  "style-src 'unsafe-inline' 'self';"]

  response.headers.set('Content-Security-Policy', csp.join(" "))
  return response
}
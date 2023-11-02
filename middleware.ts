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
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Access-Control-Allow-Origin','<origin>')

  return response
}
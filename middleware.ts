import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });

  if (requestUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.redirect(
      new URL('/api/auth/callback', request.url)
    );
  }

  return NextResponse.next();
}
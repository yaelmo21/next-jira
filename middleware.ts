// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/entries/')) {
        const id = request.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (!checkMongoIDRegExp.test(id)) {
            const ulr = request.nextUrl.clone();
            ulr.pathname = '/api/bad-request';
            ulr.search = '?message=Id no valido'
            return NextResponse.redirect(ulr);
        }
    }
    return NextResponse.next();
}


export const config = {
    matcher: ['/api/entries/:path*']
}

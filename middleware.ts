import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
    const nonce = crypto.randomUUID();
    const response = NextResponse.next();
    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'`,
    );
    response.headers.set('X-Nonce', nonce);

    return response;
};

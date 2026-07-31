import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'clarity-default-secret-key-12345!';

export async function GET(request) {
  try {
    const sessionCookie = request.cookies.get('admin_session');
    
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedToken = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(expectedUsername + '_authenticated')
      .digest('hex');
      
    if (sessionCookie.value === expectedToken) {
      return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query, initializeDatabase } from '@/lib/db';

const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'clarity-default-secret-key-12345!';

let initialized = false;
async function ensureDb() {
  if (!initialized) {
    await initializeDatabase();
    initialized = true;
  }
}

export function getSessionToken(username) {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(username + '_authenticated')
    .digest('hex');
}

export async function POST(request) {
  try {
    await ensureDb();
    const { username, password } = await request.json();
    
    const rows = await query('SELECT `username`, `password` FROM auth_settings LIMIT 1');
    
    const expectedUsername = rows.length > 0 ? rows[0].username : (process.env.ADMIN_USERNAME || 'admin');
    const expectedPassword = rows.length > 0 ? rows[0].password : (process.env.ADMIN_PASSWORD || 'clarityadmin123');
    
    if (username === expectedUsername && password === expectedPassword) {
      const token = getSessionToken(username);
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


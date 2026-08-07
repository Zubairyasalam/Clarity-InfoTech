import { NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

let initialized = false;
async function ensureDb() {
  if (!initialized) {
    await initializeDatabase();
    initialized = true;
  }
}

export async function GET() {
  try {
    await ensureDb();
    const rows = await query('SELECT `username`, `password` FROM auth_settings LIMIT 1');
    const settings = rows.length > 0 ? rows[0] : {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'clarityadmin123'
    };
    
    return NextResponse.json({ 
      success: true, 
      username: settings.username,
      password: settings.password 
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureDb();
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required' }, { status: 400 });
    }
    
    if (username.length < 3) {
      return NextResponse.json({ success: false, error: 'Username must be at least 3 characters long' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long' }, { status: 400 });
    }
    
    await query('DELETE FROM auth_settings');
    await query('INSERT INTO auth_settings (`username`, `password`) VALUES (?, ?)', [username, password]);
    
    return NextResponse.json({ success: true, message: 'Login credentials updated successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


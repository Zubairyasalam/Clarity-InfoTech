import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'clarity-default-secret-key-12345!';
const configFilePath = path.join(process.cwd(), 'src/app/api/admin/auth_settings.json');

function getAuthSettings() {
  try {
    if (fs.existsSync(configFilePath)) {
      const fileData = fs.readFileSync(configFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Failed to read auth settings file:', err);
  }
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'clarityadmin123'
  };
}

export function getSessionToken(username) {
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(username + '_authenticated')
    .digest('hex');
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const settings = getAuthSettings();
    const expectedUsername = settings.username;
    const expectedPassword = settings.password;
    
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

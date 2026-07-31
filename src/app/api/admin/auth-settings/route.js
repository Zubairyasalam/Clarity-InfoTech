import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

export async function GET() {
  const settings = getAuthSettings();
  return NextResponse.json({ 
    success: true, 
    username: settings.username,
    // Return password for display/editing
    password: settings.password 
  });
}

export async function POST(request) {
  try {
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
    
    const newSettings = { username, password };
    
    // Ensure directory exists
    const dir = path.dirname(configFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(configFilePath, JSON.stringify(newSettings, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Login credentials updated successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

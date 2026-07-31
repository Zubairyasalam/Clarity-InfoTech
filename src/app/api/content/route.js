import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/app/api/content_db.json');

function readDb() {
  try {
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to read content DB:', err);
  }
  return {};
}

function writeDb(data) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write content DB:', err);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  const db = readDb();
  if (key) {
    return NextResponse.json({ success: true, data: db[key] || null });
  }
  return NextResponse.json({ success: true, data: db });
}

export async function POST(request) {
  try {
    const { key, data } = await request.json();
    if (!key) {
      return NextResponse.json({ success: false, error: 'Key is required' }, { status: 400 });
    }
    
    const db = readDb();
    db[key] = data;
    writeDb(db);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

let initialized = false;
async function ensureDb() {
  if (!initialized) {
    await initializeDatabase();
    initialized = true;
  }
}

export async function GET(request) {
  try {
    await ensureDb();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key) {
      const rows = await query('SELECT `value` FROM web_content WHERE `key` = ?', [key]);
      const data = rows.length > 0 ? JSON.parse(rows[0].value) : null;
      return NextResponse.json({ success: true, data });
    }
    
    const rows = await query('SELECT `key`, `value` FROM web_content');
    const db = {};
    for (const row of rows) {
      db[row.key] = JSON.parse(row.value);
    }
    return NextResponse.json({ success: true, data: db });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureDb();
    const { key, data } = await request.json();
    if (!key) {
      return NextResponse.json({ success: false, error: 'Key is required' }, { status: 400 });
    }
    
    await query(
      'INSERT INTO web_content (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?',
      [key, JSON.stringify(data), JSON.stringify(data)]
    );
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Expire the cookie immediately
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/'
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

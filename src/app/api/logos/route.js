import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'logos');
    
    // Ensure directory exists
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
      
      // Copy default logos from public/ if they exist
      const publicDir = path.join(process.cwd(), 'public');
      const defaults = ['logo.png', 'c-logo.png'];
      for (const file of defaults) {
        const srcPath = path.join(publicDir, file);
        const destPath = path.join(logosDir, file);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
    
    const files = await fs.promises.readdir(logosDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];
    const logos = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => ({
        name: file,
        url: `/logos/${file}`
      }));
      
    return NextResponse.json({ logos });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename: replace non-alphanumeric characters with underscores
    const ext = path.extname(file.name);
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-]/g, '_');
    const filename = `${base}${ext}`;
    
    const logosDir = path.join(process.cwd(), 'public', 'logos');
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
    }
    
    const filePath = path.join(logosDir, filename);
    await fs.promises.writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      success: true, 
      name: filename, 
      url: `/logos/${filename}` 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

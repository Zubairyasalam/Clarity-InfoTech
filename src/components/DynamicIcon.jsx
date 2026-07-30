import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function DynamicIcon({ name, className = "", size = 24 }) {
  if (!name) return null;

  const cleanName = name.trim();

  // 1. If it's raw SVG markup
  if (cleanName.startsWith('<svg')) {
    return (
      <div 
        className={className}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: cleanName }}
      />
    );
  }

  // 2. If it's an image URL or file path
  if (cleanName.includes('/') || cleanName.includes('.') || cleanName.startsWith('data:image')) {
    return (
      <img 
        src={cleanName} 
        alt="icon" 
        className={className} 
        style={{ width: size, height: size, objectFit: 'contain' }} 
      />
    );
  }

  // 3. If it's a valid Lucide icon name
  const IconComp = LucideIcons[cleanName];
  if (IconComp) {
    return <IconComp className={className} size={size} />;
  }

  // 4. Fallback: Render as text/emoji directly
  return (
    <span 
      className={`flex items-center justify-center select-none ${className}`} 
      style={{ width: size, height: size, fontSize: size * 0.75 }}
    >
      {cleanName}
    </span>
  );
}

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool;

export function getPool() {
  if (!pool) {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_DATABASE || 'clarity_db';

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query(sql, params) {
  const connectionPool = getPool();
  const [results] = await connectionPool.execute(sql, params);
  return results;
}

// Helper to ensure database tables exist and are seeded from local JSON data
export async function initializeDatabase() {
  try {
    // 1. Create tables if they do not exist
    await query(`
      CREATE TABLE IF NOT EXISTS web_content (
        \`key\` VARCHAR(255) PRIMARY KEY,
        \`value\` LONGTEXT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS auth_settings (
        \`username\` VARCHAR(255) PRIMARY KEY,
        \`password\` VARCHAR(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Seed web_content if empty
    const contentRows = await query('SELECT COUNT(*) as count FROM web_content');
    if (contentRows[0].count === 0) {
      const contentJsonPath = path.join(process.cwd(), 'src/app/api/content_db.json');
      if (fs.existsSync(contentJsonPath)) {
        console.log('Seeding web_content table from content_db.json...');
        const fileContent = fs.readFileSync(contentJsonPath, 'utf8');
        const data = JSON.parse(fileContent);
        for (const [key, value] of Object.entries(data)) {
          await query('INSERT INTO web_content (\`key\`, \`value\`) VALUES (?, ?)', [
            key,
            JSON.stringify(value),
          ]);
        }
        console.log('web_content table successfully seeded.');
      }
    }

    // 3. Seed auth_settings if empty
    const authRows = await query('SELECT COUNT(*) as count FROM auth_settings');
    if (authRows[0].count === 0) {
      const authJsonPath = path.join(process.cwd(), 'src/app/api/admin/auth_settings.json');
      if (fs.existsSync(authJsonPath)) {
        console.log('Seeding auth_settings table from auth_settings.json...');
        const fileContent = fs.readFileSync(authJsonPath, 'utf8');
        const data = JSON.parse(fileContent);
        if (data.username && data.password) {
          await query('INSERT INTO auth_settings (\`username\`, \`password\`) VALUES (?, ?)', [
            data.username,
            data.password,
          ]);
          console.log('auth_settings table successfully seeded.');
        }
      } else {
        // Default seed
        await query('INSERT INTO auth_settings (\`username\`, \`password\`) VALUES (?, ?)', [
          'admin',
          'clarityadmin123',
        ]);
        console.log('Default auth credentials seeded.');
      }
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

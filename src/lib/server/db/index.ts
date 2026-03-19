import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import fs from 'fs';
import path from 'path';

const dbPath = env.DATABASE_URL || './data/asiateknologi.db';

// Create data directory if it doesn't exist
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');

// Auto-migrate: create tables if they don't exist
import { migrate } from './migrate';
migrate(sqlite);

export const db = drizzle(sqlite, { schema });

// Auto-seed: populate data if tables are empty
import { seed } from './seed';
seed(db, sqlite);

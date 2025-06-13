// database/database.ts
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('packmate.db');

export const initDatabase = () => {
  const createChecklist = db.execSync(
    `CREATE TABLE IF NOT EXISTS checklists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`
  );

  const createItems = db.execSync(
    `CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checklist_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      packed INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (checklist_id) REFERENCES checklists(id) ON DELETE CASCADE
    );`
  );
};

export default db;

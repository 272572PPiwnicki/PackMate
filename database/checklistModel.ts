import db from './database';

// Pobierz wszystkie checklisty
export const getAllChecklists = (): { id: number; name: string }[] => {
  const result = db.getAllSync<{ id: number; name: string }>(
    'SELECT * FROM checklists;'
  );
  return result;
};

// Dodaj nową checklistę
export const addChecklist = (name: string): void => {
  db.runSync('INSERT INTO checklists (name) VALUES (?);', [name]);
};

// Usuń checklistę
export const deleteChecklist = (id: number): void => {
  db.runSync('DELETE FROM checklists WHERE id = ?;', [id]);
};

export const updateChecklistName = (id: number, name: string): void => {
  db.runSync('UPDATE checklists SET name = ? WHERE id = ?;', [name, id]);
};

export const getChecklistById = (id: number): { id: number; name: string } | null => {
  const result = db.getFirstSync<{ id: number; name: string }>(
    'SELECT * FROM checklists WHERE id = ?;',
    [id]
  );
  return result;
};

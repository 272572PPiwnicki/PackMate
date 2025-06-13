import db from './database';

// Pobierz itemy dla danej checklisty
export const getItemsByChecklistId = (checklistId: number): { id: number; name: string; packed: number }[] => {
  return db.getAllSync(
    'SELECT * FROM items WHERE checklist_id = ?;',
    [checklistId]
  );
};

// Dodaj nowy item do checklisty
export const addItem = (checklistId: number, name: string): void => {
  db.runSync('INSERT INTO items (checklist_id, name, packed) VALUES (?, ?, 0);', [checklistId, name]);
};

// Przełącz status „spakowane”/„niespakowane”
export const toggleItemPacked = (itemId: number, current: number): void => {
  const newValue = current ? 0 : 1;
  db.runSync('UPDATE items SET packed = ? WHERE id = ?;', [newValue, itemId]);
};

// Usuń item
export const deleteItem = (itemId: number): void => {
  db.runSync('DELETE FROM items WHERE id = ?;', [itemId]);
};

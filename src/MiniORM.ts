import * as fs from 'fs';
import * as path from 'path';
import { SchemaConfig, InferSchema } from './types';
import { validateEntry } from './validation';

export class MiniORM<T extends SchemaConfig> {
private store: Map<string, InferSchema<T>> = new Map();
private schema: T;
private dbPath: string;

constructor(schema: T, fileName: string = 'database.json') {
this.schema = schema;
this.dbPath = path.resolve(__dirname, '..', fileName);
this.load(); // Load existing data on startup
}

// Private helper to save to disk
private save(): void {
const data = Array.from(this.store.entries());
const json = JSON.stringify(data, null, 2); // Pretty print JSON
fs.writeFileSync(this.dbPath, json, 'utf-8');
}

// Private helper to load from disk
private load(): void {
if (!fs.existsSync(this.dbPath)) {
return;
}
try {
const fileContent = fs.readFileSync(this.dbPath, 'utf-8');
const data = JSON.parse(fileContent);
// Reconstruct the Map from the JSON array
this.store = new Map(data);
} catch (error) {
console.error("Failed to load database:", error);
}
}

create(data: Omit<InferSchema<T>, 'id' | 'createdAt'>): InferSchema<T> {
validateEntry(this.schema, data);
const id = Math.random().toString(36).substr(2, 9);
const now = new Date(); // Note: JSON makes Dates strings, needs parsing in a real app

const doc = {
...data,
id,
createdAt: now,
} as InferSchema<T>;

this.store.set(id, doc);
this.save(); // <-- AUTO SAVE
return doc;
}

findById(id: string): InferSchema<T> | undefined {
return this.store.get(id);
}

update(id: string, updates: Partial<Omit<InferSchema<T>, 'id' | 'createdAt'>>): InferSchema<T> | null {
const existing = this.store.get(id);
if (!existing) return null;
const updatedDoc = { ...existing, ...updates };
validateEntry(this.schema, updatedDoc);
this.store.set(id, updatedDoc);
this.save(); // <-- AUTO SAVE
return updatedDoc;
}

delete(id: string): boolean {
const deleted = this.store.delete(id);
if (deleted) this.save(); // <-- AUTO SAVE
return deleted;
}
}
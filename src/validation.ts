import { SchemaConfig, FieldType } from './types';

export function validateEntry(schema: SchemaConfig, data: any): void {
for (const key in schema) {
const expectedType = schema[key];
const value = data[key];

// Check if field is missing
if (value === undefined) {
throw new Error(`Validation Error: Missing field '${key}'`);
}

// Special check for Date objects
if (expectedType === 'date') {
if (!(value instanceof Date) || isNaN(value.getTime())) {
throw new Error(`Validation Error: Field '${key}' expected Date, got ${typeof value}`);
}
continue;
}

// Standard primitive checks (string, number, boolean)
if (typeof value !== expectedType) {
throw new Error(`Validation Error: Field '${key}' expected ${expectedType}, got ${typeof value}`);
}
}
}
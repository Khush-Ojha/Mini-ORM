import { MiniORM } from '../src/MiniORM';

describe('MiniORM', () => {
// Define a schema for testing
const testSchema = {
username: 'string',
age: 'number',
isAdmin: 'boolean'
} as const;

let db: MiniORM<typeof testSchema>;

// Run this before every test
beforeEach(() => {
db = new MiniORM(testSchema);
});

test('should create a valid document', () => {
const user = db.create({
username: 'alice',
age: 30,
isAdmin: false
});

expect(user.id).toBeDefined();
expect(user.username).toBe('alice');
expect(db.findById(user.id)).toEqual(user);
});

test('should fail validation on wrong type', () => {
// We wrap it in a function so Jest can catch the error
const action = () => {
db.create({
username: 'bob',
age: 'thirty' as any, // forcing error
isAdmin: true
});
};

expect(action).toThrow('Validation Error: Field \'age\' expected number, got string');
});

test('should fail validation on missing field', () => {
const action = () => {
// @ts-ignore
db.create({
username: 'charlie',
// age is missing
isAdmin: true
});
};

expect(action).toThrow('Validation Error: Missing field \'age\'');
});
});
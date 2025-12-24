import { MiniORM } from './MiniORM';

const userSchema = {
username: 'string',
age: 'number',
isActive: 'boolean',
joinedAt: 'date'
} as const;

// This will create/read from 'users.json' in your root folder
const userDb = new MiniORM(userSchema, 'users.json');

// Check what is currently in the DB
const existingUser = userDb.findById('test-id');

if (existingUser) {
console.log("Welcome back! found saved user:", existingUser);
} else {
console.log("No user found. Creating one...");
const newUser = userDb.create({
username: "persistent_user",
age: 99,
isActive: true,
joinedAt: new Date()
});

newUser.id = 'test-id'; 
// @ts-ignore
userDb.store.set('test-id', newUser);
// @ts-ignore
userDb.save();
console.log("User created! RUN THIS SCRIPT AGAIN to see if it remembers.");
}
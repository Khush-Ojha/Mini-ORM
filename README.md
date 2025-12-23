# Type-Safe Mini ORM

A lightweight, strictly typed Object-Relational Mapper (ORM) that leverages **TypeScript Mapped Types** and **Conditional Types** to infer static interfaces directly from runtime schema configurations.

This project demonstrates how to bridge the gap between static analysis and runtime validation without code generation tools.

## 🚀 Key Features

- **Zero-Boilerplate Type Inference:** The core `MiniORM<T>` class automatically generates TypeScript interfaces based on the schema object provided at runtime.
- **Runtime Validation Bridge:** Ensures that data passed to the DB matches the schema types (e.g., checking that a `number` field actually receives a number at runtime).
- **JSON Persistence:** Automatically serializes and saves state to a local `database.json` file, mimicking a real persistent database.
- **Generic Architecture:** Built using advanced Generics to be entirely agnostic of the data structure until instantiation.
- **Unit Tested:** Comprehensive test suite using Jest to verify type integrity and validation logic.

## 🛠️ Tech Stack

- **Language:** TypeScript (Strict Mode)
- **Runtime:** Node.js
- **Testing:** Jest, ts-jest
- **Concepts Used:** Mapped Types, Conditional Types, Type Guards, File I/O.

## 📂 Project Structure

```bash
src/
├── types.ts       # Logic for mapping strings ('string') to Types (string)
├── validation.ts  # Runtime validation logic
├── MiniORM.ts     # Core CRUD class with Generics
└── index.ts       # Usage example
tests/
└── MiniORM.test.ts # Jest unit tests

```

## 🏁 Getting Started (Clone & Run)

Follow these steps to run the project on your machine.

### 1. Clone the Repository

```bash
git clone [https://github.com/Khush-Ojha/Mini-ORM.git](https://github.com/Khush-Ojha/Mini-ORM.git)
cd Mini-ORM
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Demo

```bash
npx ts-node src/index.ts
```

### 3. Run Unit Tests

```bash
npm run test
```

### 💡 How It Works

```TypeScript
import { MiniORM } from './MiniORM';

const userSchema = {
  username: 'string',
  age: 'number',
  isActive: 'boolean'
} as const; // 'as const' is required for type inference
```

## Use the Database

```TypeScript
const db = new MiniORM(userSchema, 'users.json');

// Create a new user (Type-safe!)
const user = db.create({
  username: "johndoe",
  age: 25,
  isActive: true
});

console.log("Created User ID:", user.id);
```

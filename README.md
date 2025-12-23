# Type-Safe Mini ORM (Advanced TypeScript)

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

💡 Usage

1. Define a Schema
   Important: You must use as const so TypeScript treats the values as literals rather than generic strings.

import { MiniORM } from './MiniORM';

const userSchema = {
username: 'string',
age: 'number',
isActive: 'boolean'
} as const;

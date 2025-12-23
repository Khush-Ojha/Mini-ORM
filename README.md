# Type-Safe Mini ORM (Headless CMS Core)

A lightweight, strictly typed Object-Relational Mapper (ORM) built from scratch using **Advanced TypeScript**.

This project demonstrates how to bridge the gap between **Static Type Analysis** and **Runtime Data Validation**. It allows to define a schema configuration once and automatically generates strictly typed interfaces, runtime validators, and persistence logic without code generation steps.

## 🚀 Key Features

- **Type Inference Engine:** Uses Mapped Types and Conditional Types to convert runtime JSON configuration into static TypeScript interfaces.
- **Zero-Overhead Validation:** Implements a runtime bridge that validates incoming data against the schema, ensuring that `number` types in TS are actually numbers in JS.
- **Generic Architecture:** The core class `MiniORM<T>` is entirely agnostic of the data it holds, utilizing Generics to adapt to any schema provided at instantiation.
- **Persistence Layer:** Auto-saves state to the local file system (JSON) with automatic serialization/deserialization.
- **Test-Driven:** Fully covered by Jest unit tests ensuring type integrity and validation logic.

## 🛠️ Tech Stack

- **Language:** TypeScript (Strict Mode)
- **Runtime:** Node.js
- **Testing:** Jest, ts-jest
- **Architecture:** Repository Pattern, In-Memory Caching with Disk Persistence

## 📂 Project Structure

```bash
src/
├── types.ts       # The "Meta-Programming" layer (Mapped Types)
├── validation.ts  # Runtime type guards and validation logic
├── MiniORM.ts     # Core generic class (CRUD operations)
└── index.ts       # Usage demonstration
tests/
└── MiniORM.test.ts # Unit tests for logic and types
```

💡 How It Works (The "Magic")
The core of this project relies on TypeScript's ability to infer types from const objects.

1. Schema Definition
   The user defines a schema using a plain JavaScript object. Note the usage of as const to preserve literal types.

''const userSchema = {
username: 'string',
age: 'number',
isActive: 'boolean'
} as const;'

2. Type Inference
   The MiniORM class automatically generates the following interface in the background, offering full IntelliSense support:

// Auto-generated type (User never writes this manually)
type User = {
id: string;
createdAt: Date;
username: string; // Inferred from 'string'
age: number; // Inferred from 'number'
isActive: boolean;// Inferred from 'boolean'
}
🏁 Getting Started
Prerequisites
Node.js (v14+)

npm

Installation
Clone the repository:

Bash

git clone [https://github.com/Khush-Ojha/Mini-ORM.git](https://github.com/Khush-Ojha/Mini-ORM.git)
Install dependencies:

Bash

npm install
Running the Project
Run the Demo:

Bash

'npx ts-node src/index.ts'

Run Tests:

Bash

'npm test'

export type FieldType = 'string' | 'number' | 'boolean' | 'date';

export type SchemaConfig = {
[key: string]: FieldType;
};

// Conditional type mapping
type MapToTsType<T extends FieldType> = 
T extends 'string' ? string :
T extends 'number' ? number :
T extends 'boolean' ? boolean :
T extends 'date' ? Date :
never;

// Converts a Schema Config object into a usable TypeScript Interface
export type InferSchema<T extends SchemaConfig> = {
[K in keyof T]: MapToTsType<T[K]>;
} & {
id: string;
createdAt: Date;
};
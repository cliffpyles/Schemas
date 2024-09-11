import { z } from "zod";

// Generic Record Schema
export const RecordSchema = z.object({
    id: z.string().uuid(), // unique identifier
    createdAt: z.date().default(new Date()), // creation timestamp
    updatedAt: z.date().optional(), // optional update timestamp
});

// Inferred Record Type
export type Record = z.infer<typeof RecordSchema>;

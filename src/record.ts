import { z } from "zod";

// Define the base schema for all records
export const RecordSchema = z.object({
    id: z.string().uuid().describe("Unique identifier (UUID) for the record."),
    createdAt: z.date().default(new Date()).describe("The timestamp when the record was created."),
    updatedAt: z.date().optional().describe("The timestamp when the record was last updated."),
});

export type Record = z.infer<typeof RecordSchema>;
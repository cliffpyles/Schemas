import { z } from "zod";

// Base Record Schema
export const RecordSchema = z.object({
    id: z.string().uuid().describe("Unique identifier (UUID) for the record."),
    createdAt: z.date().default(() => new Date()).describe("The timestamp when the record was created."),
    updatedAt: z.date().optional().describe("The timestamp when the record was last updated."),
});
export type Record = z.infer<typeof RecordSchema>;

// Timestamped Schema
export const TimestampedSchema = RecordSchema.extend({
    deletedAt: z.date().optional().describe("The timestamp when the record was deleted."),
    archivedAt: z.date().optional().describe("The timestamp when the record was archived."),
});
export type Timestamped = z.infer<typeof TimestampedSchema>;

// Taggable Schema
export const TaggableSchema = RecordSchema.extend({
    tags: z.array(z.string()).optional().describe("An array of tags associated with the record."),
});
export type Taggable = z.infer<typeof TaggableSchema>;

// Owned Schema
export const OwnedSchema = RecordSchema.extend({
    ownerId: z.string().uuid().describe("The unique identifier (UUID) of the entity's owner."),
});
export type Owned = z.infer<typeof OwnedSchema>;

// Versionable Schema
export const VersionableSchema = RecordSchema.extend({
    version: z.string().default("v1.0").describe("The version of the record."),
    changes: z.string().optional().describe("Description of the changes in this version."),
});
export type Versionable = z.infer<typeof VersionableSchema>;

// Locatable Schema
export const LocatableSchema = RecordSchema.extend({
    latitude: z.number().optional().describe("The latitude coordinate associated with the record."),
    longitude: z.number().optional().describe("The longitude coordinate associated with the record."),
    address: z.string().optional().describe("A textual description of the location."),
});
export type Locatable = z.infer<typeof LocatableSchema>;

// Metadata Schema
export const MetadataSchema = RecordSchema.extend({
    metadata: z.record(z.string(), z.any()).optional()
        .describe("A key-value store for additional metadata."),
});
export type Metadata = z.infer<typeof MetadataSchema>;

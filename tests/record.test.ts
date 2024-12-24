// filepath: ./tests/record.test.ts
import { describe, it, expect } from "vitest";
import {
    RecordSchema,
    SoftDeletableSchema,
    ArchivableSchema,
    TaggableSchema,
    OwnedSchema,
    VersionableSchema,
    LocatableSchema,
    MetadataSchema,
} from "../src/record";

describe("RecordSchema", () => {
    it("should validate a valid record object", () => {
        const record = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => RecordSchema.parse(record)).not.toThrow();
    });

    it("should throw an error for a record object with missing id", () => {
        const invalidRecord = {
            createdAt: new Date(),
        };
        expect(() => RecordSchema.parse(invalidRecord)).toThrow();
    });
});

describe("SoftDeletableSchema", () => {
    it("should validate a valid soft-deletable object", () => {
        const softDeletable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            deletedAt: new Date(),
        };
        expect(() => SoftDeletableSchema.parse(softDeletable)).not.toThrow();
    });

    it("should validate a soft-deletable object without deletedAt", () => {
        const softDeletable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => SoftDeletableSchema.parse(softDeletable)).not.toThrow();
    });

    it("should throw an error for a soft-deletable object with missing id", () => {
        const invalidSoftDeletable = {
            createdAt: new Date(),
            deletedAt: new Date(),
        };
        expect(() => SoftDeletableSchema.parse(invalidSoftDeletable)).toThrow();
    });
});

describe("ArchivableSchema", () => {
    it("should validate a valid archivable object", () => {
        const archivable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            archivedAt: new Date(),
        };
        expect(() => ArchivableSchema.parse(archivable)).not.toThrow();
    });

    it("should validate an archivable object without archivedAt", () => {
        const archivable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => ArchivableSchema.parse(archivable)).not.toThrow();
    });

    it("should throw an error for an archivable object with missing id", () => {
        const invalidArchivable = {
            createdAt: new Date(),
            archivedAt: new Date(),
        };
        expect(() => ArchivableSchema.parse(invalidArchivable)).toThrow();
    });
});

describe("TaggableSchema", () => {
    it("should validate a valid taggable object", () => {
        const taggable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            tags: ["important", "urgent"],
        };
        expect(() => TaggableSchema.parse(taggable)).not.toThrow();
    });

    it("should validate a taggable object without tags", () => {
        const taggable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => TaggableSchema.parse(taggable)).not.toThrow();
    });

    it("should throw an error for a taggable object with invalid tags", () => {
        const invalidTaggable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            tags: "not-an-array",
        };
        expect(() => TaggableSchema.parse(invalidTaggable)).toThrow();
    });
});

describe("OwnedSchema", () => {
    it("should validate a valid owned object", () => {
        const owned = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            ownerId: "123e4567-e89b-12d3-a456-426614174001",
        };
        expect(() => OwnedSchema.parse(owned)).not.toThrow();
    });

    it("should throw an error for an owned object with missing ownerId", () => {
        const invalidOwned = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => OwnedSchema.parse(invalidOwned)).toThrow();
    });
});

describe("VersionableSchema", () => {
    it("should validate a valid versionable object", () => {
        const versionable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            version: "v1.0",
            changes: "Initial version",
        };
        expect(() => VersionableSchema.parse(versionable)).not.toThrow();
    });

    it("should validate a versionable object without changes", () => {
        const versionable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            version: "v1.0",
        };
        expect(() => VersionableSchema.parse(versionable)).not.toThrow();
    });

    it("should throw an error for a versionable object with missing id", () => {
        const invalidVersionable = {
            createdAt: new Date(),
            version: "v1.0",
        };
        expect(() => VersionableSchema.parse(invalidVersionable)).toThrow();
    });
});

describe("LocatableSchema", () => {
    it("should validate a valid locatable object", () => {
        const locatable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            latitude: 40.7128,
            longitude: -74.006,
            address: "New York, NY",
        };
        expect(() => LocatableSchema.parse(locatable)).not.toThrow();
    });

    it("should validate a locatable object without optional fields", () => {
        const locatable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => LocatableSchema.parse(locatable)).not.toThrow();
    });

    it("should throw an error for a locatable object with invalid coordinates", () => {
        const invalidLocatable = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            latitude: "not-a-number",
        };
        expect(() => LocatableSchema.parse(invalidLocatable)).toThrow();
    });
});

describe("MetadataSchema", () => {
    it("should validate a valid metadata object", () => {
        const metadata = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            metadata: {
                author: "John Doe",
                category: "documentation",
            },
        };
        expect(() => MetadataSchema.parse(metadata)).not.toThrow();
    });

    it("should validate a metadata object without metadata field", () => {
        const metadata = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => MetadataSchema.parse(metadata)).not.toThrow();
    });

    it("should throw an error for a metadata object with invalid metadata field", () => {
        const invalidMetadata = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            metadata: "not-an-object",
        };
        expect(() => MetadataSchema.parse(invalidMetadata)).toThrow();
    });
});

// filepath: ./tests/content.test.ts
import { describe, it, expect } from "vitest";
import {
    MediaAssetSchema,
    TaxonomySchema,
    CategorySchema,
    TagSchema,
    AuthorSchema,
    ContentVersionSchema,
    ContentWorkflowSchema,
    ContentRelationSchema,
    CommentSchema,
    ContentLocalizationSchema,
    EditorSchema,
    ViewTemplateSchema,
    PageSchema,
    ContentEditorStateSchema,
    ContentPreviewSchema,
    ContentTypeSchema,
    ContentEntrySchema,
} from "../src/content";

describe("MediaAssetSchema", () => {
    it("should validate a valid media asset", () => {
        const mediaAsset = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileName: "image.jpg",
            fileType: "image/jpeg",
            url: "https://example.com/image.jpg",
            description: "A sample image",
            createdAt: new Date(),
        };
        expect(() => MediaAssetSchema.parse(mediaAsset)).not.toThrow();
    });

    it("should throw an error for an invalid media asset", () => {
        const invalidMediaAsset = {
            fileName: "",
            fileType: "image/jpeg",
        };
        expect(() => MediaAssetSchema.parse(invalidMediaAsset)).toThrow();
    });
});

// Similar tests for each schema...

describe("TaxonomySchema", () => {
    it("should validate a valid taxonomy", () => {
        const taxonomy = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Categories",
            isHierarchical: true,
            createdAt: new Date(),
        };
        expect(() => TaxonomySchema.parse(taxonomy)).not.toThrow();
    });

    it("should throw an error for an invalid taxonomy", () => {
        const invalidTaxonomy = { name: "" };
        expect(() => TaxonomySchema.parse(invalidTaxonomy)).toThrow();
    });
});

// Repeat similar tests for all schemas in the content module

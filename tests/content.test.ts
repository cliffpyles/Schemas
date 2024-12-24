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

describe("CategorySchema", () => {
    it("should validate a valid category", () => {
        const category = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            taxonomyId: "123e4567-e89b-12d3-a456-426614174001",
            name: "Electronics",
            createdAt: new Date(),
        };
        expect(() => CategorySchema.parse(category)).not.toThrow();
    });

    it("should throw an error for an invalid category", () => {
        const invalidCategory = { taxonomyId: "", name: "" };
        expect(() => CategorySchema.parse(invalidCategory)).toThrow();
    });
});

describe("TagSchema", () => {
    it("should validate a valid tag", () => {
        const tag = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            taxonomyId: "123e4567-e89b-12d3-a456-426614174001",
            name: "Featured",
            createdAt: new Date(),
        };
        expect(() => TagSchema.parse(tag)).not.toThrow();
    });

    it("should throw an error for an invalid tag", () => {
        const invalidTag = { taxonomyId: "", name: "" };
        expect(() => TagSchema.parse(invalidTag)).toThrow();
    });
});

describe("AuthorSchema", () => {
    it("should validate a valid author", () => {
        const author = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "John Doe",
            bio: "A prolific author",
            profilePictureUrl: "https://example.com/profile.jpg",
            createdAt: new Date(),
        };
        expect(() => AuthorSchema.parse(author)).not.toThrow();
    });

    it("should throw an error for an invalid author", () => {
        const invalidAuthor = { name: "" };
        expect(() => AuthorSchema.parse(invalidAuthor)).toThrow();
    });
});

describe("ContentVersionSchema", () => {
    it("should validate a valid content version", () => {
        const contentVersion = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            versionNumber: "v1.0",
            isCurrentVersion: true,
            createdAt: new Date(),
        };
        expect(() => ContentVersionSchema.parse(contentVersion)).not.toThrow();
    });

    it("should throw an error for an invalid content version", () => {
        const invalidContentVersion = { versionNumber: "" };
        expect(() => ContentVersionSchema.parse(invalidContentVersion)).toThrow();
    });
});

describe("ContentWorkflowSchema", () => {
    it("should validate a valid content workflow", () => {
        const contentWorkflow = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            status: "draft",
            createdAt: new Date(),
        };
        expect(() => ContentWorkflowSchema.parse(contentWorkflow)).not.toThrow();
    });

    it("should throw an error for an invalid content workflow", () => {
        const invalidContentWorkflow = { status: "invalid-status" };
        expect(() => ContentWorkflowSchema.parse(invalidContentWorkflow)).toThrow();
    });
});

describe("ContentRelationSchema", () => {
    it("should validate a valid content relation", () => {
        const contentRelation = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fromContentId: "123e4567-e89b-12d3-a456-426614174001",
            toContentId: "123e4567-e89b-12d3-a456-426614174002",
            relationType: "related",
            createdAt: new Date(),
        };
        expect(() => ContentRelationSchema.parse(contentRelation)).not.toThrow();
    });

    it("should throw an error for an invalid content relation", () => {
        const invalidContentRelation = { fromContentId: "", toContentId: "" };
        expect(() => ContentRelationSchema.parse(invalidContentRelation)).toThrow();
    });
});

describe("CommentSchema", () => {
    it("should validate a valid comment", () => {
        const comment = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            author: "Jane Doe",
            text: "This is a comment",
            createdAt: new Date(),
        };
        expect(() => CommentSchema.parse(comment)).not.toThrow();
    });

    it("should throw an error for an invalid comment", () => {
        const invalidComment = { text: "" };
        expect(() => CommentSchema.parse(invalidComment)).toThrow();
    });
});

describe("ContentLocalizationSchema", () => {
    it("should validate a valid content localization", () => {
        const contentLocalization = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            languageCode: "en",
            localizedFields: { title: "Hello" },
            createdAt: new Date(),
        };
        expect(() => ContentLocalizationSchema.parse(contentLocalization)).not.toThrow();
    });

    it("should throw an error for an invalid content localization", () => {
        const invalidLocalization = { languageCode: "" };
        expect(() => ContentLocalizationSchema.parse(invalidLocalization)).toThrow();
    });
});

describe("EditorSchema", () => {
    it("should validate a valid editor object", () => {
        const editor = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            editorType: "richText",
            settings: { toolbar: ["bold", "italic"] },
            autosaveInterval: 30,
            createdAt: new Date(),
        };
        expect(() => EditorSchema.parse(editor)).not.toThrow();
    });

    it("should throw an error for an invalid editor object", () => {
        const invalidEditor = { editorType: "unsupportedType" };
        expect(() => EditorSchema.parse(invalidEditor)).toThrow();
    });
});

describe("ViewTemplateSchema", () => {
    it("should validate a valid view template", () => {
        const viewTemplate = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Blog Template",
            layout: "singleColumn",
            fields: [
                { fieldName: "title", fieldType: "text" },
                { fieldName: "body", fieldType: "richText" },
            ],
            createdAt: new Date(),
        };
        expect(() => ViewTemplateSchema.parse(viewTemplate)).not.toThrow();
    });

    it("should throw an error for an invalid view template", () => {
        const invalidViewTemplate = { name: "" };
        expect(() => ViewTemplateSchema.parse(invalidViewTemplate)).toThrow();
    });
});

describe("PageSchema", () => {
    it("should validate a valid page object", () => {
        const page = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Home",
            slug: "/home",
            templateId: "123e4567-e89b-12d3-a456-426614174001",
            isPublished: true,
            createdAt: new Date(),
        };
        expect(() => PageSchema.parse(page)).not.toThrow();
    });

    it("should throw an error for an invalid page object", () => {
        const invalidPage = { title: "", slug: "" };
        expect(() => PageSchema.parse(invalidPage)).toThrow();
    });
});

describe("ContentEditorStateSchema", () => {
    it("should validate a valid content editor state", () => {
        const editorState = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            editorState: "editing",
            lastEditedAt: new Date(),
            editorType: "markdown",
            createdAt: new Date(),
        };
        expect(() => ContentEditorStateSchema.parse(editorState)).not.toThrow();
    });

    it("should throw an error for an invalid content editor state", () => {
        const invalidEditorState = { editorState: "unsupportedState" };
        expect(() => ContentEditorStateSchema.parse(invalidEditorState)).toThrow();
    });
});

describe("ContentPreviewSchema", () => {
    it("should validate a valid content preview", () => {
        const contentPreview = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentEntryId: "123e4567-e89b-12d3-a456-426614174001",
            previewUrl: "https://example.com/preview",
            previewGeneratedAt: new Date(),
            createdAt: new Date(),
        };
        expect(() => ContentPreviewSchema.parse(contentPreview)).not.toThrow();
    });

    it("should throw an error for an invalid content preview", () => {
        const invalidContentPreview = { previewUrl: "not-a-url" };
        expect(() => ContentPreviewSchema.parse(invalidContentPreview)).toThrow();
    });
});

describe("ContentTypeSchema", () => {
    it("should validate a valid content type", () => {
        const contentType = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Blog Post",
            fields: [
                { fieldName: "title", fieldType: "text" },
                { fieldName: "body", fieldType: "richText" },
            ],
            createdAt: new Date(),
        };
        expect(() => ContentTypeSchema.parse(contentType)).not.toThrow();
    });

    it("should throw an error for an invalid content type", () => {
        const invalidContentType = { name: "" };
        expect(() => ContentTypeSchema.parse(invalidContentType)).toThrow();
    });
});

describe("ContentEntrySchema", () => {
    it("should validate a valid content entry", () => {
        const contentEntry = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            contentTypeId: "123e4567-e89b-12d3-a456-426614174001",
            fields: { title: "Hello World", body: "This is the body text." },
            status: "published",
            createdAt: new Date(),
        };
        expect(() => ContentEntrySchema.parse(contentEntry)).not.toThrow();
    });

    it("should throw an error for an invalid content entry", () => {
        const invalidContentEntry = { fields: {} };
        expect(() => ContentEntrySchema.parse(invalidContentEntry)).toThrow();
    });
});

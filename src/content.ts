import { z } from "zod";
import { RecordSchema } from "./record";

/**
 * Schema for a MediaAsset, representing a media file like images, videos, or documents.
 */
export const MediaAssetSchema = RecordSchema.extend({
    fileName: z.string().min(1, "File name is required.")
        .describe("The name of the media asset file, such as 'hero.jpg' or 'document.pdf'."),

    fileType: z.string().min(1, "File type is required.")
        .describe("The type of the file, such as 'image/jpeg' or 'application/pdf'."),

    url: z.string().url("Must be a valid URL.")
        .describe("The URL where the media asset is hosted."),

    description: z.string().optional()
        .describe("An optional description of the media asset."),

    altText: z.string().optional()
        .describe("Alternative text for accessibility or SEO purposes."),

    sizeInBytes: z.number().optional()
        .describe("The size of the media asset in bytes."),

    dimensions: z.object({
        width: z.number().optional(),
        height: z.number().optional(),
    }).optional().describe("Optional dimensions (width and height) of the media asset, if applicable."),
});

export type MediaAsset = z.infer<typeof MediaAssetSchema>;

/**
 * Schema for a Taxonomy, representing a structured classification system, such as categories or tags.
 */
export const TaxonomySchema = RecordSchema.extend({
    name: z.string().min(1, "Taxonomy name is required.")
        .describe("The name of the taxonomy, such as 'Categories' or 'Tags'."),

    description: z.string().optional()
        .describe("A description of the taxonomy and its purpose."),

    isHierarchical: z.boolean().default(false)
        .describe("Indicates whether the taxonomy is hierarchical (e.g., categories) or flat (e.g., tags)."),
});

export type Taxonomy = z.infer<typeof TaxonomySchema>;

/**
 * Schema for a Category, representing a hierarchical structure within a taxonomy (e.g., product categories).
 */
export const CategorySchema = RecordSchema.extend({
    taxonomyId: z.string().uuid()
        .describe("The unique identifier (UUID) of the taxonomy this category belongs to."),

    name: z.string().min(1, "Category name is required.")
        .describe("The name of the category."),

    parentCategoryId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the parent category, if applicable."),

    description: z.string().optional()
        .describe("An optional description of the category."),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Schema for a Tag, representing a non-hierarchical label used to classify content.
 */
export const TagSchema = RecordSchema.extend({
    taxonomyId: z.string().uuid()
        .describe("The unique identifier (UUID) of the taxonomy this tag belongs to."),

    name: z.string().min(1, "Tag name is required.")
        .describe("The name of the tag."),

    description: z.string().optional()
        .describe("An optional description of the tag."),
});

export type Tag = z.infer<typeof TagSchema>;

/**
 * Schema for an Author, representing the creator of content in the CMS.
 */
export const AuthorSchema = RecordSchema.extend({
    name: z.string().min(1, "Author name is required.")
        .describe("The name of the author."),

    bio: z.string().optional()
        .describe("A short biography of the author."),

    profilePictureUrl: z.string().url().optional()
        .describe("The URL of the author's profile picture."),

    socialLinks: z.array(z.object({
        platform: z.string().min(1, "Social platform is required."),
        url: z.string().url("Must be a valid URL."),
    })).optional().describe("An array of social media links for the author."),
});

export type Author = z.infer<typeof AuthorSchema>;

/**
 * Schema for ContentVersion, representing a version of a content entry.
 */
export const ContentVersionSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry this version is related to."),

    versionNumber: z.string().min(1, "Version number is required.")
        .describe("The version number (e.g., 'v1.0', 'v2.1')."),

    changes: z.string().optional()
        .describe("A description of the changes made in this version."),

    isCurrentVersion: z.boolean().default(false)
        .describe("Indicates whether this is the current version of the content entry."),
});

export type ContentVersion = z.infer<typeof ContentVersionSchema>;

/**
 * Schema for a ContentWorkflow, representing the workflow for content creation, review, and approval.
 */
export const ContentWorkflowSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry that this workflow applies to."),

    status: z.enum(["draft", "in-review", "approved", "published", "archived"])
        .describe("The current status of the content in the workflow."),

    assignedTo: z.string().uuid().optional()
        .describe("The user or team assigned to review or approve this content."),

    dueDate: z.date().optional()
        .describe("An optional due date for content approval or review."),

    comments: z.array(z.string()).optional()
        .describe("An array of comments from reviewers or approvers."),
});

export type ContentWorkflow = z.infer<typeof ContentWorkflowSchema>;

/**
 * Schema for a ContentRelation, representing relationships between content entries.
 */
export const ContentRelationSchema = RecordSchema.extend({
    fromContentId: z.string().uuid()
        .describe("The unique identifier (UUID) of the source content entry."),

    toContentId: z.string().uuid()
        .describe("The unique identifier (UUID) of the related content entry."),

    relationType: z.enum(["related", "featured", "parent-child"])
        .describe("The type of relationship between the content entries."),
});

export type ContentRelation = z.infer<typeof ContentRelationSchema>;

/**
 * Schema for a Comment, representing user-generated feedback or discussion on content.
 */
export const CommentSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry this comment is associated with."),

    author: z.string().min(1, "Comment author is required.")
        .describe("The name of the author of the comment."),

    text: z.string().min(1, "Comment text is required.")
        .describe("The content of the comment."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when the comment was created."),
});

export type Comment = z.infer<typeof CommentSchema>;

/**
 * Schema for ContentLocalization, representing localized versions of content for different languages.
 */
export const ContentLocalizationSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry this localization is for."),

    languageCode: z.string().min(2).max(5)
        .describe("The language code for this localized content (e.g., 'en', 'fr', 'es')."),

    localizedFields: z.record(z.string(), z.any())
        .describe("A record of field names and their localized values."),

    isPrimaryLanguage: z.boolean().default(false)
        .describe("Indicates whether this is the primary language for the content."),
});

export type ContentLocalization = z.infer<typeof ContentLocalizationSchema>;

/**
 * Schema for an Editor, representing the editor used for creating and editing content.
 */
export const EditorSchema = RecordSchema.extend({
    editorType: z.enum(["richText", "markdown", "code", "wysiwyg"])
        .describe("The type of editor used for content creation or editing (e.g., rich text, Markdown, WYSIWYG)."),

    settings: z.record(z.string(), z.any()).optional()
        .describe("Optional configuration settings for the editor (e.g., toolbar options, syntax highlighting)."),

    autosaveInterval: z.number().optional()
        .describe("The interval (in seconds) at which the content is autosaved."),
});

export type Editor = z.infer<typeof EditorSchema>;

/**
 * Schema for a ViewTemplate, representing a layout or template used to display content.
 */
export const ViewTemplateSchema = RecordSchema.extend({
    name: z.string().min(1, "Template name is required.")
        .describe("The name of the template (e.g., 'Blog Template', 'Product Page Template')."),

    description: z.string().optional()
        .describe("A short description of the template and its intended use."),

    layout: z.enum(["singleColumn", "twoColumn", "grid", "custom"])
        .describe("The layout type for the template (e.g., single column, two-column, grid, custom)."),

    fields: z.array(z.object({
        fieldName: z.string().min(1, "Field name is required."),
        fieldType: z.enum(["text", "image", "video", "richText", "json"])
            .describe("The type of field rendered in the template."),
    })).optional().describe("An optional array of fields to be displayed within the template."),
});

export type ViewTemplate = z.infer<typeof ViewTemplateSchema>;

/**
 * Schema for a Page, representing a content page where entries are displayed.
 */
export const PageSchema = RecordSchema.extend({
    title: z.string().min(1, "Page title is required.")
        .describe("The title of the page, typically used as the main heading."),

    slug: z.string().min(1, "Page slug is required.")
        .describe("The URL slug for the page (e.g., '/about', '/blog/my-first-post')."),

    templateId: z.string().uuid()
        .describe("The unique identifier (UUID) of the view template used for this page."),

    contentEntries: z.array(z.string().uuid()).optional()
        .describe("An array of content entry UUIDs that are displayed on this page."),

    seoMetadata: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
    }).optional().describe("Optional SEO metadata for the page (title, description, keywords)."),

    isPublished: z.boolean().default(false)
        .describe("Indicates whether the page is published and visible to the public."),

    publishDate: z.date().optional()
        .describe("The date and time when the page was published."),
});

export type Page = z.infer<typeof PageSchema>;

/**
 * Schema for ContentEditorState, representing the state of content while it is being edited.
 */
export const ContentEditorStateSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry being edited."),

    editorState: z.enum(["draft", "editing", "autosaving", "saved"])
        .describe("The current state of the content editor (e.g., draft, editing, autosaving, saved)."),

    lastEditedAt: z.date().default(new Date())
        .describe("The date and time when the content was last edited."),

    editorType: z.enum(["richText", "markdown", "code", "wysiwyg"])
        .describe("The type of editor currently being used."),
});

export type ContentEditorState = z.infer<typeof ContentEditorStateSchema>;

/**
 * Schema for ContentPreview, representing a preview state for viewing content before it is published.
 */
export const ContentPreviewSchema = RecordSchema.extend({
    contentEntryId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content entry being previewed."),

    templateId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the view template being used to preview the content."),

    previewUrl: z.string().url()
        .describe("The URL where the content can be previewed."),

    previewGeneratedAt: z.date().default(new Date())
        .describe("The date and time when the preview was generated."),
});

export type ContentPreview = z.infer<typeof ContentPreviewSchema>;

/**
 * Schema for a ContentField, representing an individual field within a content type.
 */
export const ContentFieldSchema = z.object({
    fieldName: z.string().min(1, "Field name is required.")
        .describe("The name of the field (e.g., 'title', 'body', 'image')."),

    fieldType: z.enum(["text", "richText", "image", "video", "boolean", "number", "date", "json"])
        .describe("The type of the field (e.g., text, rich text, image, boolean, number)."),

    required: z.boolean().default(false)
        .describe("Indicates whether this field is required."),

    defaultValue: z.any().optional()
        .describe("An optional default value for this field."),

    validationRules: z.object({
        maxLength: z.number().optional(),
        minLength: z.number().optional(),
        minValue: z.number().optional(),
        maxValue: z.number().optional(),
        regex: z.string().optional(),
    }).optional().describe("Optional validation rules for the field."),

    displayOptions: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        helpText: z.string().optional(),
    }).optional().describe("Optional display options like labels, placeholders, and help text."),
});

export type ContentField = z.infer<typeof ContentFieldSchema>;

/**
 * Schema for a ContentType, representing a structure or blueprint for different types of content.
 */
export const ContentTypeSchema = RecordSchema.extend({
    name: z.string().min(1, "Content type name is required.")
        .describe("The name of the content type, such as 'Blog Post', 'Product', or 'Page'."),

    description: z.string().optional()
        .describe("A description of the content type and its purpose."),

    fields: z.array(ContentFieldSchema)
        .describe("An array of fields that define the structure of the content type."),
});

export type ContentType = z.infer<typeof ContentTypeSchema>;

/**
 * Schema for a ContentEntry, representing an individual piece of content within a content type.
 */
export const ContentEntrySchema = RecordSchema.extend({
    contentTypeId: z.string().uuid()
        .describe("The unique identifier (UUID) of the content type this entry belongs to."),

    fields: z.record(z.string(), z.any())
        .describe("A record of field names and their values, based on the associated content type."),

    status: z.enum(["draft", "published", "archived"]).default("draft")
        .describe("The publication status of the content entry."),

    publishedAt: z.date().optional()
        .describe("The date and time when the content entry was published."),
});

export type ContentEntry = z.infer<typeof ContentEntrySchema>;

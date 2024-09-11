import { z } from "zod";
import { RecordSchema } from "./record";

/**
 * Schema for a FlashCard, a study tool that presents information in two parts:
 * the front and the back, which could represent various types of content.
 */
export const FlashCardSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic to which this flashcard belongs."),
    frontContent: z.string().min(1, "Front content cannot be empty.")
        .describe("The main content displayed on the front of the flashcard, such as a question, term, or prompt."),
    backContent: z.string().min(1, "Back content cannot be empty.")
        .describe("The answer, explanation, or content that corresponds to the front side of the flashcard."),
    difficulty: z.enum(["easy", "medium", "hard"]).default("medium")
        .describe("The difficulty level of the flashcard, used to gauge its complexity."),
    tags: z.array(z.string()).optional().describe("Optional tags for organizing or filtering flashcards by different categories or keywords."),
});
export type FlashCard = z.infer<typeof FlashCardSchema>;

/**
 * Schema for a Topic, representing a subject or category that organizes learning material.
 */
export const TopicSchema = RecordSchema.extend({
    title: z.string().min(1, "Title is required.")
        .describe("The title or name of the topic. It should describe the subject of the content."),
    description: z.string().optional().describe("A detailed description of the topic."),
});
export type Topic = z.infer<typeof TopicSchema>;

/**
 * Schema for a Note, representing text content that a user creates while studying a topic.
 */
export const NoteSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic to which this note is related."),
    content: z.string().min(1, "Content cannot be empty.")
        .describe("The main body of the note, containing the user's thoughts, explanations, or observations related to the topic."),
    tags: z.array(z.string()).optional().describe("Optional tags for organizing the note by categories or keywords."),
});
export type Note = z.infer<typeof NoteSchema>;

/**
 * Schema for a DefinitionList, representing a collection of terms and their corresponding definitions.
 */
export const DefinitionEntrySchema = z.object({
    term: z.string().min(1, "Term is required.").describe("The term or word being defined in the list."),
    definition: z.string().min(1, "Definition is required.").describe("The explanation or definition of the term."),
});
export const DefinitionListSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic that this definition list relates to."),
    definitions: z.array(DefinitionEntrySchema).min(1, "At least one definition is required.")
        .describe("An array of term-definition pairs representing a collection of terms and their explanations."),
});
export type DefinitionList = z.infer<typeof DefinitionListSchema>;
export type DefinitionEntry = z.infer<typeof DefinitionEntrySchema>;

/**
 * A structured section within a cheatsheet that contains various types of content.
 */
export const CheatsheetSectionSchema = z.object({
    title: z.string().min(1, "Section title is required.")
        .describe("The title or heading of this section in the cheatsheet."),
    content: z.union([
        z.object({
            type: z.literal("text"),
            value: z.string().min(1, "Text content is required.").describe("A block of text content in the section."),
        }),
        z.object({
            type: z.literal("list"),
            items: z.array(z.string().min(1, "List item cannot be empty.")).describe("A list of items in the section."),
        }),
        z.object({
            type: z.literal("formula"),
            expression: z.string().min(1, "Formula expression is required.").describe("A mathematical or scientific formula in the section."),
        }),
        z.object({
            type: z.literal("table"),
            headers: z.array(z.string().min(1, "Table header is required.")).describe("The headers for the table columns."),
            rows: z.array(z.array(z.string().min(1)).min(1)).describe("Rows of content representing the table."),
        }),
    ]).describe("The structured content of the section, which can be text, a list, a formula, or a table."),
});
export const CheatsheetSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic to which this cheatsheet belongs."),
    title: z.string().min(1, "Title is required.").describe("The title or name of the cheatsheet."),
    sections: z.array(CheatsheetSectionSchema).min(1, "At least one section is required.")
        .describe("The sections that make up the content of the cheatsheet, each containing structured data."),
    tags: z.array(z.string()).optional().describe("Optional tags for organizing or filtering cheatsheets by categories or keywords."),
});
export type Cheatsheet = z.infer<typeof CheatsheetSchema>;
export type CheatsheetSection = z.infer<typeof CheatsheetSectionSchema>;

/**
 * Schema for a Mindmap, a visual representation of ideas or concepts connected by nodes and branches.
 */
export const MindmapNodeSchema = z.object({
    id: z.string().uuid().describe("Unique identifier (UUID) for the node."),
    content: z.string().min(1, "Content is required.").describe("The content of the node, which could be a term or concept."),
    parentId: z.string().uuid().optional().describe("The unique identifier (UUID) of the parent node, if applicable."),
    children: z.array(z.string().uuid()).optional().describe("An array of unique identifiers (UUIDs) of child nodes, if applicable."),
});
export const MindmapSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic to which this mindmap belongs."),
    title: z.string().min(1, "Title is required.").describe("The title of the mindmap."),
    nodes: z.array(MindmapNodeSchema).min(1, "At least one node is required.")
        .describe("An array of nodes representing the structure of the mindmap."),
});
export type Mindmap = z.infer<typeof MindmapSchema>;
export type MindmapNode = z.infer<typeof MindmapNodeSchema>;

/**
 * Schema for a Diagram, a graphical representation of concepts using shapes, lines, and text.
 */
export const DiagramSchema = RecordSchema.extend({
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic to which this diagram belongs."),
    title: z.string().min(1, "Title is required.").describe("The title of the diagram."),
    description: z.string().optional().describe("Optional description of the diagram."),
    elements: z.array(
        z.object({
            id: z.string().uuid().describe("Unique identifier (UUID) for the element."),
            type: z.enum(["shape", "line", "text"]).describe("The type of diagram element, such as a shape, line, or text."),
            content: z.string().optional().describe("The content of the element, if applicable."),
            coordinates: z.tuple([z.number(), z.number()]).describe("The coordinates of the element in the diagram."),
            size: z.number().optional().describe("Optional size of the element, such as for shapes."),
        })
    ).min(1, "At least one element is required.").describe("An array of elements representing the structure of the diagram."),
});
export type Diagram = z.infer<typeof DiagramSchema>;
export type DiagramElement = z.infer<typeof DiagramSchema.shape["elements"].element >;

/**
 * Schema for a Bookmark, a saved reference to specific content such as a URL or document.
 */
export const BookmarkSchema = RecordSchema.extend({
    title: z.string().min(1, "Title is required.").describe("The title of the bookmark."),
    url: z.string().url("Must be a valid URL.").optional().describe("Optional URL of the bookmark, if linking to a web resource."),
    page: z.number().optional().describe("Optional page number or reference within a document."),
    notes: z.string().optional().describe("Optional notes or comments related to the bookmark."),
    topicId: z.string().uuid().optional().describe("The unique identifier (UUID) of the associated topic, if applicable."),
});
export type Bookmark = z.infer<typeof BookmarkSchema>;

/**
 * Schema for a Study Plan, representing goals and tasks organized for learning.
 */
export const StudyPlanSchema = RecordSchema.extend({
    title: z.string().min(1, "Title is required.").describe("The title of the study plan."),
    goals: z.array(z.string().min(1, "Goal cannot be empty.")).min(1).describe("A list of study goals."),
    topics: z.array(z.string().uuid()).optional().describe("An array of topic UUIDs related to this study plan."),
    startDate: z.date().optional().describe("Optional start date for the study plan."),
    endDate: z.date().optional().describe("Optional end date for the study plan."),
    isCompleted: z.boolean().default(false).describe("Whether the study plan has been completed."),
});
export type StudyPlan = z.infer<typeof StudyPlanSchema>;

/**
 * Schema for a Study Session, representing a session spent on learning or practicing a topic.
 */
export const StudySessionSchema = RecordSchema.extend({
    studyPlanId: z.string().uuid().optional().describe("Optional reference to the associated study plan."),
    topicId: z.string().uuid().describe("The unique identifier (UUID) of the topic studied during this session."),
    duration: z.number().min(1, "Duration must be at least 1 minute.").describe("The duration of the study session in minutes."),
    date: z.date().describe("The date when the study session took place."),
    notes: z.string().optional().describe("Optional notes taken during the study session."),
});
export type StudySession = z.infer<typeof StudySessionSchema>;

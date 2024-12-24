// filepath: ./tests/learning.test.ts
import { describe, it, expect } from "vitest";
import {
    FlashCardSchema,
    TopicSchema,
    NoteSchema,
    DefinitionListSchema,
    CheatsheetSchema,
    MindmapSchema,
    DiagramSchema,
    BookmarkSchema,
    StudyPlanSchema,
    StudySessionSchema,
} from "../src/learning";

describe("FlashCardSchema", () => {
    it("should validate a valid flashcard", () => {
        const flashcard = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            frontContent: "What is 2 + 2?",
            backContent: "4",
            difficulty: "easy",
            createdAt: new Date(),
        };
        expect(() => FlashCardSchema.parse(flashcard)).not.toThrow();
    });

    it("should throw an error for an invalid flashcard", () => {
        const invalidFlashcard = {
            frontContent: "",
        };
        expect(() => FlashCardSchema.parse(invalidFlashcard)).toThrow();
    });
});

// Repeat similar tests for all schemas in the learning module

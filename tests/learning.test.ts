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

describe("TopicSchema", () => {
    it("should validate a valid topic", () => {
        const topic = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Mathematics",
            description: "Study of numbers and equations",
            createdAt: new Date(),
        };
        expect(() => TopicSchema.parse(topic)).not.toThrow();
    });

    it("should throw an error for an invalid topic", () => {
        const invalidTopic = {
            title: "",
        };
        expect(() => TopicSchema.parse(invalidTopic)).toThrow();
    });
});

describe("NoteSchema", () => {
    it("should validate a valid note", () => {
        const note = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            content: "This is a note about algebra.",
            createdAt: new Date(),
        };
        expect(() => NoteSchema.parse(note)).not.toThrow();
    });

    it("should throw an error for an invalid note", () => {
        const invalidNote = {
            content: "",
        };
        expect(() => NoteSchema.parse(invalidNote)).toThrow();
    });
});

describe("DefinitionListSchema", () => {
    it("should validate a valid definition list", () => {
        const definitionList = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            definitions: [
                { term: "Algebra", definition: "A branch of mathematics." },
            ],
            createdAt: new Date(),
        };
        expect(() => DefinitionListSchema.parse(definitionList)).not.toThrow();
    });

    it("should throw an error for an invalid definition list", () => {
        const invalidDefinitionList = {
            definitions: [],
        };
        expect(() => DefinitionListSchema.parse(invalidDefinitionList)).toThrow();
    });
});

describe("CheatsheetSchema", () => {
    it("should validate a valid cheatsheet", () => {
        const cheatsheet = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            title: "Math Basics",
            sections: [
                {
                    title: "Arithmetic",
                    content: {
                        type: "text",
                        value: "Addition, subtraction, multiplication, division.",
                    },
                },
            ],
            createdAt: new Date(),
        };
        expect(() => CheatsheetSchema.parse(cheatsheet)).not.toThrow();
    });

    it("should throw an error for an invalid cheatsheet", () => {
        const invalidCheatsheet = {
            title: "",
            sections: [],
        };
        expect(() => CheatsheetSchema.parse(invalidCheatsheet)).toThrow();
    });
});

describe("MindmapSchema", () => {
    it("should validate a valid mindmap", () => {
        const mindmap = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            title: "Science Concepts",
            nodes: [
                {
                    id: "123e4567-e89b-12d3-a456-426614174002",
                    content: "Physics",
                },
            ],
            createdAt: new Date(),
        };
        expect(() => MindmapSchema.parse(mindmap)).not.toThrow();
    });

    it("should throw an error for an invalid mindmap", () => {
        const invalidMindmap = {
            title: "",
            nodes: [],
        };
        expect(() => MindmapSchema.parse(invalidMindmap)).toThrow();
    });
});

describe("DiagramSchema", () => {
    it("should validate a valid diagram", () => {
        const diagram = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            title: "Solar System",
            elements: [
                {
                    id: "123e4567-e89b-12d3-a456-426614174002",
                    type: "shape",
                    coordinates: [0, 0],
                },
            ],
            createdAt: new Date(),
        };
        expect(() => DiagramSchema.parse(diagram)).not.toThrow();
    });

    it("should throw an error for an invalid diagram", () => {
        const invalidDiagram = {
            title: "",
            elements: [],
        };
        expect(() => DiagramSchema.parse(invalidDiagram)).toThrow();
    });
});

describe("BookmarkSchema", () => {
    it("should validate a valid bookmark", () => {
        const bookmark = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Math Resource",
            url: "https://example.com",
            createdAt: new Date(),
        };
        expect(() => BookmarkSchema.parse(bookmark)).not.toThrow();
    });

    it("should throw an error for an invalid bookmark", () => {
        const invalidBookmark = {
            title: "",
        };
        expect(() => BookmarkSchema.parse(invalidBookmark)).toThrow();
    });
});

describe("StudyPlanSchema", () => {
    it("should validate a valid study plan", () => {
        const studyPlan = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Weekly Study Plan",
            goals: ["Complete algebra", "Read physics chapter 1"],
            createdAt: new Date(),
        };
        expect(() => StudyPlanSchema.parse(studyPlan)).not.toThrow();
    });

    it("should throw an error for an invalid study plan", () => {
        const invalidStudyPlan = {
            title: "",
            goals: [],
        };
        expect(() => StudyPlanSchema.parse(invalidStudyPlan)).toThrow();
    });
});

describe("StudySessionSchema", () => {
    it("should validate a valid study session", () => {
        const studySession = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            topicId: "123e4567-e89b-12d3-a456-426614174001",
            duration: 60,
            date: new Date(),
            createdAt: new Date(),
        };
        expect(() => StudySessionSchema.parse(studySession)).not.toThrow();
    });

    it("should throw an error for an invalid study session", () => {
        const invalidStudySession = {
            duration: 0,
        };
        expect(() => StudySessionSchema.parse(invalidStudySession)).toThrow();
    });
});

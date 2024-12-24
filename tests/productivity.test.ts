// filepath: ./tests/productivity.test.ts
import { describe, it, expect } from "vitest";
import {
    TaskSchema,
    ProjectSchema,
    TaskListSchema,
    MilestoneSchema,
    SubtaskSchema,
    CommentSchema,
    AttachmentSchema,
    TimeLogSchema,
    TagSchema,
    EventSchema,
} from "../src/productivity";

describe("TaskSchema", () => {
    it("should validate a valid task", () => {
        const task = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Finish documentation",
            status: "to-do",
            priority: "medium",
            createdAt: new Date(),
        };
        expect(() => TaskSchema.parse(task)).not.toThrow();
    });

    it("should throw an error for a task missing required fields", () => {
        const invalidTask = {
            title: "",
        };
        expect(() => TaskSchema.parse(invalidTask)).toThrow();
    });
});

describe("ProjectSchema", () => {
    it("should validate a valid project", () => {
        const project = {
            id: "123e4567-e89b-12d3-a456-426614174001",
            title: "New Website Launch",
            status: "in-progress",
            createdAt: new Date(),
        };
        expect(() => ProjectSchema.parse(project)).not.toThrow();
    });

    it("should throw an error for a project with invalid status", () => {
        const invalidProject = {
            id: "123e4567-e89b-12d3-a456-426614174001",
            title: "New Website Launch",
            status: "not-valid-status",
            createdAt: new Date(),
        };
        expect(() => ProjectSchema.parse(invalidProject)).toThrow();
    });
});

describe("TaskListSchema", () => {
    it("should validate a valid task list", () => {
        const taskList = {
            id: "123e4567-e89b-12d3-a456-426614174002",
            title: "Sprint Tasks",
            createdAt: new Date(),
        };
        expect(() => TaskListSchema.parse(taskList)).not.toThrow();
    });

    it("should throw an error for a task list with missing title", () => {
        const invalidTaskList = {
            id: "123e4567-e89b-12d3-a456-426614174002",
            title: "",
            createdAt: new Date(),
        };
        expect(() => TaskListSchema.parse(invalidTaskList)).toThrow();
    });
});

describe("MilestoneSchema", () => {
    it("should validate a valid milestone", () => {
        const milestone = {
            id: "123e4567-e89b-12d3-a456-426614174003",
            title: "Complete Design Phase",
            dueDate: new Date(),
            status: "in-progress",
            createdAt: new Date(),
        };
        expect(() => MilestoneSchema.parse(milestone)).not.toThrow();
    });

    it("should throw an error for a milestone with invalid status", () => {
        const invalidMilestone = {
            id: "123e4567-e89b-12d3-a456-426614174003",
            title: "Complete Design Phase",
            dueDate: new Date(),
            status: "unknown-status",
            createdAt: new Date(),
        };
        expect(() => MilestoneSchema.parse(invalidMilestone)).toThrow();
    });
});

describe("SubtaskSchema", () => {
    it("should validate a valid subtask", () => {
        const subtask = {
            id: "123e4567-e89b-12d3-a456-426614174004",
            title: "Write API documentation",
            status: "in-progress",
            taskId: "123e4567-e89b-12d3-a456-426614174000",
            priority: "high",
            createdAt: new Date(),
        };
        expect(() => SubtaskSchema.parse(subtask)).not.toThrow();
    });

    it("should throw an error for a subtask with missing parent task ID", () => {
        const invalidSubtask = {
            title: "Write API documentation",
            status: "in-progress",
            createdAt: new Date(),
        };
        expect(() => SubtaskSchema.parse(invalidSubtask)).toThrow();
    });
});

describe("CommentSchema", () => {
    it("should validate a valid comment", () => {
        const comment = {
            id: "123e4567-e89b-12d3-a456-426614174005",
            content: "This is a great task!",
            author: "John Doe",
            taskId: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
        };
        expect(() => CommentSchema.parse(comment)).not.toThrow();
    });

    it("should throw an error for a comment with missing content", () => {
        const invalidComment = {
            author: "John Doe",
            taskId: "123e4567-e89b-12d3-a456-426614174000",
        };
        expect(() => CommentSchema.parse(invalidComment)).toThrow();
    });
});

describe("AttachmentSchema", () => {
    it("should validate a valid attachment", () => {
        const attachment = {
            id: "123e4567-e89b-12d3-a456-426614174006",
            fileName: "report.pdf",
            fileType: "application/pdf",
            url: "https://example.com/report.pdf",
            createdAt: new Date(),
        };
        expect(() => AttachmentSchema.parse(attachment)).not.toThrow();
    });

    it("should throw an error for an attachment with missing fields", () => {
        const invalidAttachment = {
            fileName: "report.pdf",
        };
        expect(() => AttachmentSchema.parse(invalidAttachment)).toThrow();
    });
});

describe("TimeLogSchema", () => {
    it("should validate a valid time log", () => {
        const timeLog = {
            id: "123e4567-e89b-12d3-a456-426614174007",
            taskId: "123e4567-e89b-12d3-a456-426614174000",
            duration: 120,
            logDate: new Date(),
            createdAt: new Date(),
        };
        expect(() => TimeLogSchema.parse(timeLog)).not.toThrow();
    });

    it("should throw an error for a time log with negative duration", () => {
        const invalidTimeLog = {
            id: "123e4567-e89b-12d3-a456-426614174007",
            taskId: "123e4567-e89b-12d3-a456-426614174000",
            duration: -10,
            logDate: new Date(),
        };
        expect(() => TimeLogSchema.parse(invalidTimeLog)).toThrow();
    });
});

describe("TagSchema", () => {
    it("should validate a valid tag", () => {
        const tag = {
            id: "123e4567-e89b-12d3-a456-426614174008",
            name: "Urgent",
            createdAt: new Date(),
        };
        expect(() => TagSchema.parse(tag)).not.toThrow();
    });

    it("should throw an error for a tag with missing name", () => {
        const invalidTag = {
            id: "123e4567-e89b-12d3-a456-426614174008",
            name: "",
        };
        expect(() => TagSchema.parse(invalidTag)).toThrow();
    });
});

describe("EventSchema", () => {
    it("should validate a valid event", () => {
        const event = {
            id: "123e4567-e89b-12d3-a456-426614174009",
            title: "Team Meeting",
            eventDate: new Date(),
            createdAt: new Date(),
        };
        expect(() => EventSchema.parse(event)).not.toThrow();
    });

    it("should throw an error for an event with missing title", () => {
        const invalidEvent = {
            eventDate: new Date(),
        };
        expect(() => EventSchema.parse(invalidEvent)).toThrow();
    });
});

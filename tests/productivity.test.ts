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
            createdAt: new Date(),
        };
        expect(() => TaskSchema.parse(task)).not.toThrow();
    });

    it("should throw an error for an invalid task", () => {
        const invalidTask = { title: "" };
        expect(() => TaskSchema.parse(invalidTask)).toThrow();
    });
});

// Repeat similar tests for all schemas in the productivity module

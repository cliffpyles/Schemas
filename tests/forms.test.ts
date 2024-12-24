// filepath: ./tests/forms.test.ts
import { describe, it, expect } from "vitest";
import {
    FormFieldSchema,
    FormLayoutConfigSchema,
    FormSectionSchema,
    FormLayoutSchema,
    FormActionsSchema,
    FormDependenciesSchema,
    RepeatingFieldGroupSchema,
    FormRestraintsSchema,
    FormSchema,
} from "../src/forms";

describe("FormFieldSchema", () => {
    it("should validate a valid form field", () => {
        const formField = {
            fieldName: "username",
            type: "text",
            required: true,
        };
        expect(() => FormFieldSchema.parse(formField)).not.toThrow();
    });

    it("should throw an error for an invalid form field", () => {
        const invalidFormField = { fieldName: "" };
        expect(() => FormFieldSchema.parse(invalidFormField)).toThrow();
    });
});

// Similar tests for each schema...

describe("FormSchema", () => {
    it("should validate a valid form", () => {
        const form = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            formName: "User Registration",
            fields: [{ fieldName: "email", type: "text" }],
            layout: { layoutType: "singleColumn", sections: [] },
            actions: { submitAction: "/submit" },
            createdAt: new Date(),
        };
        expect(() => FormSchema.parse(form)).not.toThrow();
    });

    it("should throw an error for an invalid form", () => {
        const invalidForm = { formName: "" };
        expect(() => FormSchema.parse(invalidForm)).toThrow();
    });
});

// Repeat similar tests for all schemas in the forms module

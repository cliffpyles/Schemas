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
        const invalidFormField = {
            fieldName: "",
            type: "text",
        };
        expect(() => FormFieldSchema.parse(invalidFormField)).toThrow();
    });
});

describe("FormLayoutConfigSchema", () => {
    it("should validate a valid form layout configuration", () => {
        const layoutConfig = {
            columns: 12,
            align: "center",
            padding: { top: 10, bottom: 10 },
            margin: { left: 5, right: 5 },
        };
        expect(() => FormLayoutConfigSchema.parse(layoutConfig)).not.toThrow();
    });

    it("should throw an error for an invalid form layout configuration", () => {
        const invalidLayoutConfig = {
            columns: 0, // Invalid, must be at least 1
        };
        expect(() => FormLayoutConfigSchema.parse(invalidLayoutConfig)).toThrow();
    });
});

describe("FormSectionSchema", () => {
    it("should validate a valid form section", () => {
        const formSection = {
            sectionTitle: "User Information",
            fields: [
                { fieldName: "email", type: "text", required: true },
            ],
        };
        expect(() => FormSectionSchema.parse(formSection)).not.toThrow();
    });

    it("should throw an error for a form section with invalid fields", () => {
        const invalidFormSection = {
            sectionTitle: "Invalid Section",
            fields: [{ fieldName: "", type: "text" }],
        };
        expect(() => FormSectionSchema.parse(invalidFormSection)).toThrow();
    });
});

describe("FormLayoutSchema", () => {
    it("should validate a valid form layout", () => {
        const formLayout = {
            layoutType: "singleColumn",
            sections: [
                {
                    sectionTitle: "Profile",
                    fields: [{ fieldName: "name", type: "text", required: true }],
                },
            ],
        };
        expect(() => FormLayoutSchema.parse(formLayout)).not.toThrow();
    });

    it("should throw an error for a form layout with missing fields", () => {
        const invalidFormLayout = {
            layoutType: "grid",
        };
        expect(() => FormLayoutSchema.parse(invalidFormLayout)).toThrow();
    });
});

describe("FormActionsSchema", () => {
    it("should validate a valid form actions configuration", () => {
        const formActions = {
            submitAction: "/api/submit",
            resetAction: "/api/reset",
            redirectOnSubmit: "https://example.com/success",
        };
        expect(() => FormActionsSchema.parse(formActions)).not.toThrow();
    });

    it("should throw an error for invalid form actions", () => {
        const invalidFormActions = {
            submitAction: "", // Invalid, submitAction is required
        };
        expect(() => FormActionsSchema.parse(invalidFormActions)).toThrow();
    });
});

describe("FormDependenciesSchema", () => {
    it("should validate a valid form dependency", () => {
        const formDependency = {
            dependentField: "confirmPassword",
            dependsOnField: "password",
            condition: "equals",
            dependentFieldBehavior: "enable",
        };
        expect(() => FormDependenciesSchema.parse(formDependency)).not.toThrow();
    });

    it("should throw an error for an invalid form dependency", () => {
        const invalidFormDependency = {
            dependentField: "",
            dependsOnField: "password",
            condition: "equals",
        };
        expect(() => FormDependenciesSchema.parse(invalidFormDependency)).toThrow();
    });
});

describe("RepeatingFieldGroupSchema", () => {
    it("should validate a valid repeating field group", () => {
        const repeatingFieldGroup = {
            groupName: "Addresses",
            fields: [{ fieldName: "street", type: "text" }],
            minRepeats: 1,
            maxRepeats: 3,
        };
        expect(() => RepeatingFieldGroupSchema.parse(repeatingFieldGroup)).not.toThrow();
    });

    it("should throw an error for an invalid repeating field group", () => {
        const invalidRepeatingFieldGroup = {
            groupName: "",
            fields: [],
        };
        expect(() => RepeatingFieldGroupSchema.parse(invalidRepeatingFieldGroup)).toThrow();
    });
});

describe("FormRestraintsSchema", () => {
    it("should validate a valid form restraints object", () => {
        const formRestraints = {
            maxFields: 10,
            maxFieldLength: 255,
            allowedFieldTypes: ["text", "checkbox"],
        };
        expect(() => FormRestraintsSchema.parse(formRestraints)).not.toThrow();
    });

    it("should throw an error for an invalid form restraints object", () => {
        const invalidFormRestraints = {
            maxFields: -1, // Invalid, must be positive
        };
        expect(() => FormRestraintsSchema.parse(invalidFormRestraints)).toThrow();
    });
});

describe("FormSchema", () => {
    it("should validate a valid form object", () => {
        const form = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            formName: "User Registration",
            description: "Form for registering a new user",
            fields: [{ fieldName: "username", type: "text", required: true }],
            layout: {
                layoutType: "singleColumn",
                sections: [
                    {
                        sectionTitle: "Profile Info",
                        fields: [{ fieldName: "email", type: "text", required: true }],
                    },
                ],
            },
            actions: {
                submitAction: "/submit",
                resetAction: "/reset",
                redirectOnSubmit: "https://example.com/success",
            },
            createdAt: new Date(),
        };
        expect(() => FormSchema.parse(form)).not.toThrow();
    });

    it("should throw an error for an invalid form object", () => {
        const invalidForm = {
            formName: "",
            fields: [],
            layout: { layoutType: "singleColumn", sections: [] },
            actions: { submitAction: "" },
        };
        expect(() => FormSchema.parse(invalidForm)).toThrow();
    });
});

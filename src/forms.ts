import { z } from "zod";
import { RecordSchema } from "./record";

/**
 * Schema for FormField, representing an individual form field component.
 */
export const FormFieldSchema = z.object({
    fieldName: z.string().min(1, "Field name is required.")
        .describe("The name of the form field (e.g., 'username', 'email')."),

    label: z.string().optional()
        .describe("The label to display for the form field."),

    type: z.enum(["text", "textarea", "number", "select", "checkbox", "radio", "date", "password", "relationship", "custom"])
        .describe("The type of the form field component (e.g., text input, select dropdown, checkbox, relationship, custom component)."),

    placeholder: z.string().optional()
        .describe("Optional placeholder text for the field."),

    options: z.array(z.string()).optional()
        .describe("Optional array of options for select, radio, or dropdown fields."),

    defaultValue: z.any().optional()
        .describe("Optional default value for the field."),

    required: z.boolean().default(false)
        .describe("Indicates whether the field is required."),

    validations: z.object({
        minLength: z.number().optional()
            .describe("Optional minimum length for text fields."),

        maxLength: z.number().optional()
            .describe("Optional maximum length for text fields."),

        minValue: z.number().optional()
            .describe("Optional minimum value for number fields."),

        maxValue: z.number().optional()
            .describe("Optional maximum value for number fields."),

        pattern: z.string().optional()
            .describe("Optional regular expression pattern for validating field input."),
    }).optional().describe("Optional validation rules for the form field."),

    errorMessage: z.string().optional()
        .describe("Custom error message to display when validation fails."),

    relationship: z.object({
        relationshipType: z.enum(["oneToOne", "oneToMany", "manyToMany"])
            .describe("The type of relationship (one-to-one, one-to-many, many-to-many)."),

        relatedRecordType: z.string().min(1, "Related record type is required.")
            .describe("The type of record this field relates to (e.g., 'User', 'Project')."),

        relatedRecords: z.array(z.string().uuid()).optional()
            .describe("An optional array of UUIDs representing related records."),

        allowAddNew: z.boolean().default(false)
            .describe("Indicates whether users can add new related records directly in the form."),
    }).optional().describe("Configuration for relationship fields, allowing reference to related records."),

    customComponent: z.object({
        componentName: z.string().min(1, "Custom component name is required.")
            .describe("The name of the custom component to render."),

        props: z.record(z.string(), z.any()).optional()
            .describe("Props to pass to the custom component."),
    }).optional().describe("Configuration for rendering a custom component."),
});

export type FormField = z.infer<typeof FormFieldSchema>;

/**
 * Schema for FormLayoutConfig, providing granular layout control for individual fields or sections.
 */
export const FormLayoutConfigSchema = z.object({
    columns: z.number().min(1).default(12)
        .describe("Defines how many columns this field or section spans (e.g., 12-column grid system)."),

    order: z.number().optional()
        .describe("Optional order value to control the positioning of this field or section."),

    align: z.enum(["left", "center", "right"]).optional()
        .describe("Optional alignment for this field or section."),

    padding: z.object({
        top: z.number().optional(),
        bottom: z.number().optional(),
        left: z.number().optional(),
        right: z.number().optional(),
    }).optional().describe("Optional padding for the field or section."),

    margin: z.object({
        top: z.number().optional(),
        bottom: z.number().optional(),
        left: z.number().optional(),
        right: z.number().optional(),
    }).optional().describe("Optional margin for the field or section."),
});

export type FormLayoutConfig = z.infer<typeof FormLayoutConfigSchema>;

/**
 * Schema for FormSection, representing a section of the form to group related fields.
 */
export const FormSectionSchema = z.object({
    sectionTitle: z.string().optional()
        .describe("The title of the form section."),

    description: z.string().optional()
        .describe("Optional description for the section."),

    fields: z.array(FormFieldSchema)
        .describe("An array of form fields within this section."),

    layoutConfig: FormLayoutConfigSchema.optional()
        .describe("Optional granular layout configuration for the section."),

    conditionalLogic: z.object({
        dependsOnField: z.string().optional()
            .describe("The name of the field this section's visibility depends on."),

        condition: z.enum(["equals", "notEquals", "greaterThan", "lessThan"]).optional()
            .describe("The condition to evaluate based on the value of the dependent field."),

        value: z.any().optional()
            .describe("The value that triggers the conditional behavior."),

        hidden: z.boolean().default(false)
            .describe("Determines if this section should be hidden based on the condition."),
    }).optional().describe("Conditional logic for showing or hiding the section based on another field's value."),
});

export type FormSection = z.infer<typeof FormSectionSchema>;

/**
 * Schema for FormLayout, representing the structure and layout of the form (rows, columns, sections).
 */
export const FormLayoutSchema = z.object({
    layoutType: z.enum(["singleColumn", "twoColumn", "grid", "custom"])
        .describe("The layout type for the form (e.g., single column, two-column, grid)."),

    sections: z.array(FormSectionSchema)
        .describe("An array of sections in the form, each containing multiple form fields."),

    layoutConfig: FormLayoutConfigSchema.optional()
        .describe("Optional granular layout configuration for the overall form."),
});

export type FormLayout = z.infer<typeof FormLayoutSchema>;

/**
 * Schema for FormActions, representing actions that can be triggered by the form (e.g., submit, reset).
 */
export const FormActionsSchema = z.object({
    submitAction: z.string().min(1, "Submit action is required.")
        .describe("The action triggered when the form is submitted (e.g., API endpoint)."),

    resetAction: z.string().optional()
        .describe("Optional action triggered when the form is reset."),

    redirectOnSubmit: z.string().url().optional()
        .describe("Optional URL to redirect to after successful form submission."),
});

export type FormActions = z.infer<typeof FormActionsSchema>;

/**
 * Schema for FormDependencies, representing dependencies between fields.
 */
export const FormDependenciesSchema = z.object({
    dependentField: z.string().min(1, "Dependent field name is required.")
        .describe("The name of the field that depends on another field."),

    dependsOnField: z.string().min(1, "Depends on field name is required.")
        .describe("The name of the field that this dependency is based on."),

    condition: z.enum(["equals", "notEquals", "greaterThan", "lessThan"])
        .describe("The condition for the dependency."),

    dependentFieldBehavior: z.enum(["show", "hide", "enable", "disable"])
        .describe("The behavior of the dependent field when the condition is met."),

    dependentOptions: z.array(z.string()).optional()
        .describe("Optional array of options to update the dependent field with."),
});

export type FormDependencies = z.infer<typeof FormDependenciesSchema>;

/**
 * Schema for a RepeatingFieldGroup, representing a group of fields that can dynamically repeat (e.g., adding multiple addresses).
 */
export const RepeatingFieldGroupSchema = z.object({
    groupName: z.string().min(1, "Group name is required.")
        .describe("The name of the field group (e.g., 'addresses', 'contacts')."),

    fields: z.array(FormFieldSchema)
        .describe("An array of fields within this group."),

    minRepeats: z.number().optional()
        .describe("Optional minimum number of times the group can repeat."),

    maxRepeats: z.number().optional()
        .describe("Optional maximum number of times the group can repeat."),

    addButtonLabel: z.string().optional()
        .describe("The label for the 'Add' button to add more instances of this group."),

    removeButtonLabel: z.string().optional()
        .describe("The label for the 'Remove' button to remove instances of this group."),

    layoutConfig: FormLayoutConfigSchema.optional()
        .describe("Optional granular layout configuration for the repeating field group."),
});

export type RepeatingFieldGroup = z.infer<typeof RepeatingFieldGroupSchema>;

/**
 * Schema for FormRestraints, representing constraints and limits for the form fields.
 */
export const FormRestraintsSchema = z.object({
    maxFields: z.number().optional()
        .describe("Optional maximum number of fields allowed in the form."),

    maxFieldLength: z.number().optional()
        .describe("Optional maximum length of field names or values."),

    allowedFieldTypes: z.array(z.enum(["text", "textarea", "number", "select", "checkbox", "radio", "date", "password", "custom"]))
        .optional().describe("Optional array of allowed field types."),

    allowedOptionsCount: z.number().optional()
        .describe("Optional maximum number of options allowed for select, radio, or dropdown fields."),
});

export type FormRestraints = z.infer<typeof FormRestraintsSchema>;

/**
 * Schema for Form, representing the entire form structure, including layout, fields, validations, restraints, and relationships.
 */
export const FormSchema = RecordSchema.extend({
    formName: z.string().min(1, "Form name is required.")
        .describe("The name of the form."),

    description: z.string().optional()
        .describe("Optional description of the form."),

    fields: z.array(FormFieldSchema)
        .describe("An array of fields that make up the form."),

    layout: FormLayoutSchema
        .describe("The layout of the form, defining how fields are arranged."),

    actions: FormActionsSchema
        .describe("The actions associated with the form, such as submit or reset."),

    dependencies: z.array(FormDependenciesSchema).optional()
        .describe("An array of field dependencies."),

    repeatingGroups: z.array(RepeatingFieldGroupSchema).optional()
        .describe("Optional repeating groups of fields, allowing dynamic adding/removing of field groups."),

    restraints: FormRestraintsSchema.optional()
        .describe("Optional constraints and limits applied to the form fields."),
});

export type Form = z.infer<typeof FormSchema>;

import { z } from "zod";
import { RecordSchema } from "./record"; // Import the common RecordSchema


/**
 * Schema for a TaskList, representing an ordered or categorized list of tasks.
 */
export const TaskListSchema = RecordSchema.extend({
    title: z.string().min(1, "Task list title is required.")
        .describe("The title or name of the task list."),

    description: z.string().optional()
        .describe("A detailed description of the task list."),

    tasks: z.array(z.string().uuid()).optional()
        .describe("An optional array of task UUIDs that belong to this task list."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project to which this task list belongs."),
});

export type TaskList = z.infer<typeof TaskListSchema>;

/**
 * Schema for a Milestone, representing a significant event or objective in a project.
 */
export const MilestoneSchema = RecordSchema.extend({
    title: z.string().min(1, "Milestone title is required.")
        .describe("The title or name of the milestone."),

    description: z.string().optional()
        .describe("A detailed description of the milestone, outlining its significance."),

    dueDate: z.date()
        .describe("The date when the milestone is expected to be reached."),

    status: z.enum(["not-started", "in-progress", "completed"])
        .describe("The current status of the milestone."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project to which this milestone belongs."),
});

export type Milestone = z.infer<typeof MilestoneSchema>;

/**
 * Schema for a Subtask, representing a smaller task within a larger parent task.
 */
export const SubtaskSchema = RecordSchema.extend({
    title: z.string().min(1, "Subtask title is required.")
        .describe("The title or name of the subtask, providing a brief description of the subtask."),

    description: z.string().optional()
        .describe("A detailed description of the subtask, outlining its purpose and requirements."),

    status: z.enum(["to-do", "in-progress", "completed"])
        .describe("The current status of the subtask."),

    dueDate: z.date().optional()
        .describe("The due date for the subtask, if applicable."),

    taskId: z.string().uuid()
        .describe("The unique identifier (UUID) of the parent task to which this subtask belongs."),

    priority: z.enum(["low", "medium", "high"]).default("medium")
        .describe("The priority level of the subtask."),
});

export type Subtask = z.infer<typeof SubtaskSchema>;

/**
 * Schema for a Comment, representing feedback or discussion related to a task or project.
 */
export const CommentSchema = RecordSchema.extend({
    content: z.string().min(1, "Comment content is required.")
        .describe("The text content of the comment."),

    author: z.string().min(1, "Author is required.")
        .describe("The name or identifier of the person who made the comment."),

    taskId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the task this comment is related to, if applicable."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project this comment is related to, if applicable."),
});

export type Comment = z.infer<typeof CommentSchema>;

/**
 * Schema for an Attachment, representing a file or link associated with a task or project.
 */
export const AttachmentSchema = RecordSchema.extend({
    fileName: z.string().min(1, "File name is required.")
        .describe("The name of the file or attachment."),

    fileType: z.string().min(1, "File type is required.")
        .describe("The type or format of the file (e.g., PDF, image, document)."),

    url: z.string().url("Must be a valid URL.")
        .describe("The URL or location of the attachment."),

    taskId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the task this attachment is associated with, if applicable."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project this attachment is associated with, if applicable."),
});

export type Attachment = z.infer<typeof AttachmentSchema>;

/**
 * Schema for a TimeLog, representing time spent on a task or project.
 */
export const TimeLogSchema = RecordSchema.extend({
    taskId: z.string().uuid()
        .describe("The unique identifier (UUID) of the task this time log is associated with."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project this time log is associated with, if applicable."),

    duration: z.number().min(1, "Duration must be at least 1 minute.")
        .describe("The time duration in minutes that was spent on the task or project."),

    description: z.string().optional()
        .describe("Optional description of the time logged (e.g., specific activity or focus)."),

    logDate: z.date()
        .describe("The date when the time was logged."),
});

export type TimeLog = z.infer<typeof TimeLogSchema>;

/**
 * Schema for a Tag, representing a label used for categorization.
 */
export const TagSchema = RecordSchema.extend({
    name: z.string().min(1, "Tag name is required.")
        .describe("The name of the tag used for categorizing tasks, projects, or other entities."),

    description: z.string().optional()
        .describe("A short description of the tag."),
});

export type Tag = z.infer<typeof TagSchema>;

/**
 * Schema for an Event, representing a scheduled occurrence related to a task or project.
 */
export const EventSchema = RecordSchema.extend({
    title: z.string().min(1, "Event title is required.")
        .describe("The title or name of the event."),

    description: z.string().optional()
        .describe("A description of the event and its purpose."),

    eventDate: z.date()
        .describe("The date and time when the event is scheduled to take place."),

    taskId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the task this event is associated with."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project this event is associated with."),
});

export type Event = z.infer<typeof EventSchema>;

/**
 * Schema for a Reminder, representing a scheduled alert related to a task or project.
 */
export const ReminderSchema = z.object({
    reminderDate: z.date().describe("The date and time when the reminder should trigger."),
    message: z.string().optional().describe("Optional message to display when the reminder triggers."),
});

export type Reminder = z.infer<typeof ReminderSchema>;

/**
* Schema for a Task, representing a unit of work that needs to be completed.
*/
export const TaskSchema = RecordSchema.extend({
    title: z.string().min(1, "Task title is required.")
        .describe("The title or name of the task."),

    description: z.string().optional()
        .describe("A detailed description of the task."),

    status: z.enum(["to-do", "in-progress", "completed"])
        .describe("The current status of the task."),

    dueDate: z.date().optional()
        .describe("The due date for the task."),

    priority: z.enum(["low", "medium", "high"]).default("medium")
        .describe("The priority level of the task."),

    tags: z.array(z.string().uuid()).optional()
        .describe("An array of tag UUIDs to categorize the task."),

    projectId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the project this task belongs to."),

    reminders: z.array(ReminderSchema).optional()
        .describe("An array of reminders associated with this task."),

    dependencies: z.array(z.string().uuid()).optional()
        .describe("An array of task UUIDs that this task depends on. These tasks must be completed before this task."),
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Schema for a Project, representing a collection of tasks and objectives.
 */
export const ProjectSchema = RecordSchema.extend({
    title: z.string().min(1, "Project title is required.")
        .describe("The title or name of the project."),

    description: z.string().optional()
        .describe("A detailed description of the project."),

    status: z.enum(["not-started", "in-progress", "completed"])
        .describe("The current status of the project."),

    startDate: z.date().optional()
        .describe("The start date of the project."),

    dueDate: z.date().optional()
        .describe("The due date for the project."),

    tasks: z.array(z.string().uuid()).optional()
        .describe("An array of task UUIDs associated with this project."),

    tags: z.array(z.string().uuid()).optional()
        .describe("An array of tag UUIDs to categorize the project."),

    reminders: z.array(ReminderSchema).optional()
        .describe("An array of reminders associated with this project."),
});

export type Project = z.infer<typeof ProjectSchema>;

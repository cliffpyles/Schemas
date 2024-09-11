import { z } from "zod";
import { RecordSchema } from "./record";

/**
 * Schema for a File, representing a document or media file.
 */
export const FileSchema = RecordSchema.extend({
    fileName: z.string().min(1, "File name is required.")
        .describe("The name of the file (e.g., 'report.pdf')."),

    fileType: z.string().min(1, "File type is required.")
        .describe("The type of the file (e.g., 'application/pdf', 'image/jpeg')."),

    fileSize: z.number().describe("The size of the file in bytes."),

    fileUrl: z.string().url("Must be a valid URL.")
        .describe("The URL where the file is hosted."),

    description: z.string().optional()
        .describe("A short description of the file."),

    tags: z.array(z.string()).optional()
        .describe("An optional array of tags for categorizing the file."),

    version: z.string().default("v1.0")
        .describe("The version number of the file."),

    isPublic: z.boolean().default(false)
        .describe("Indicates whether the file is publicly accessible."),

    accessManagement: z.object({
        accessType: z.enum(["public", "private", "restricted"]).default("private")
            .describe("The access level of the file (public, private, restricted)."),

        users: z.array(z.string().uuid()).optional()
            .describe("An array of user UUIDs that have access to the file."),

        groups: z.array(z.string().uuid()).optional()
            .describe("An array of group UUIDs that have access to the file."),

        allowedRegions: z.array(z.string()).optional()
            .describe("An array of regions where access to the file is allowed."),

        allowedIPs: z.array(z.string()).optional()
            .describe("An array of allowed IP addresses for accessing the file."),

        accessTime: z.object({
            startTime: z.date().optional(),
            endTime: z.date().optional(),
        }).optional().describe("Optional time range when the file is accessible."),

        maxAccesses: z.number().optional()
            .describe("The maximum number of times the file can be accessed."),

        passcode: z.string().optional()
            .describe("Optional passcode required to access the file."),
    }).describe("Access management options for the file."),
});

export type File = z.infer<typeof FileSchema>;

/**
 * Schema for a FileCategory, representing a category for organizing files.
 */
export const FileCategorySchema = RecordSchema.extend({
    name: z.string().min(1, "Category name is required.")
        .describe("The name of the file category."),

    description: z.string().optional()
        .describe("A description of the file category."),

    parentCategoryId: z.string().uuid().optional()
        .describe("The UUID of the parent category, if applicable."),
});

export type FileCategory = z.infer<typeof FileCategorySchema>;

/**
 * Schema for FileVersion, representing a version of a file.
 */
export const FileVersionSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file this version belongs to."),

    version: z.string().min(1, "Version number is required.")
        .describe("The version number of the file (e.g., 'v1.0')."),

    changeLog: z.string().optional()
        .describe("A description of the changes made in this version."),

    fileUrl: z.string().url("Must be a valid URL.")
        .describe("The URL where this file version is hosted."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when this version was created."),
});

export type FileVersion = z.infer<typeof FileVersionSchema>;

/**
 * Schema for FileHistory, representing the history of actions performed on a file.
 */
export const FileHistorySchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file this history entry belongs to."),

    action: z.enum(["created", "modified", "viewed", "deleted", "restored", "downloaded"])
        .describe("The action performed on the file."),

    performedBy: z.string().uuid()
        .describe("The UUID of the user who performed the action."),

    timestamp: z.date().default(new Date())
        .describe("The date and time when the action was performed."),
});

export type FileHistory = z.infer<typeof FileHistorySchema>;

/**
 * Schema for UserActivity, representing user activity related to files.
 */
export const UserActivitySchema = RecordSchema.extend({
    userId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user."),

    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file involved in this activity."),

    action: z.enum(["viewed", "downloaded", "commented", "shared"])
        .describe("The action taken by the user."),

    timestamp: z.date().default(new Date())
        .describe("The date and time when the activity occurred."),
});

export type UserActivity = z.infer<typeof UserActivitySchema>;

/**
 * Schema for FileComment, representing comments made on a file.
 */
export const FileCommentSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file the comment is related to."),

    authorId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who made the comment."),

    comment: z.string().min(1, "Comment text is required.")
        .describe("The content of the comment."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when the comment was created."),
});

export type FileComment = z.infer<typeof FileCommentSchema>;

/**
 * Schema for EventNotification, representing notifications related to file events.
 */
export const EventNotificationSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file involved in the event."),

    eventType: z.enum(["uploaded", "updated", "shared", "commented", "accessed"])
        .describe("The type of event that triggered the notification."),

    recipientId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user receiving the notification."),

    message: z.string().optional()
        .describe("Optional message included in the notification."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when the notification was created."),
});

export type EventNotification = z.infer<typeof EventNotificationSchema>;

/**
 * Schema for a Folder, representing a hierarchical structure to organize files.
 */
export const FolderSchema = RecordSchema.extend({
    name: z.string().min(1, "Folder name is required.")
        .describe("The name of the folder."),

    parentFolderId: z.string().uuid().optional()
        .describe("The UUID of the parent folder, if applicable."),

    description: z.string().optional()
        .describe("A short description of the folder."),

    accessManagement: z.object({
        accessType: z.enum(["public", "private", "restricted"]).default("private")
            .describe("The access level of the folder (public, private, restricted)."),

        users: z.array(z.string().uuid()).optional()
            .describe("An array of user UUIDs that have access to the folder."),

        groups: z.array(z.string().uuid()).optional()
            .describe("An array of group UUIDs that have access to the folder."),
    }).describe("Access management options for the folder."),
});

export type Folder = z.infer<typeof FolderSchema>;

/**
 * Schema for a SharedLink, representing a shareable link for a file with configurable access settings.
 */
export const SharedLinkSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file being shared."),

    url: z.string().url("Must be a valid URL.")
        .describe("The shareable URL for the file."),

    expiresAt: z.date().optional()
        .describe("The expiration date and time for the shared link, if applicable."),

    passcode: z.string().optional()
        .describe("Optional passcode required to access the shared link."),

    maxAccesses: z.number().optional()
        .describe("Optional limit on the number of times the link can be accessed."),

    allowedIPs: z.array(z.string()).optional()
        .describe("Optional array of allowed IP addresses for accessing the shared link."),
});

export type SharedLink = z.infer<typeof SharedLinkSchema>;

/**
 * Schema for a DownloadRequest, representing a user-initiated request to download a file.
 */
export const DownloadRequestSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file being requested for download."),

    requestedBy: z.string().uuid()
        .describe("The UUID of the user requesting the download."),

    status: z.enum(["pending", "approved", "rejected", "completed"])
        .describe("The current status of the download request."),

    requestedAt: z.date().default(new Date())
        .describe("The date and time when the download was requested."),

    reviewedBy: z.string().uuid().optional()
        .describe("The UUID of the user who approved or rejected the request."),

    reviewedAt: z.date().optional()
        .describe("The date and time when the request was reviewed."),
});

export type DownloadRequest = z.infer<typeof DownloadRequestSchema>;

/**
 * Schema for an AuditLog, capturing all activities and security events related to file sharing.
 */
export const AuditLogSchema = RecordSchema.extend({
    eventType: z.enum(["created", "updated", "deleted", "accessed", "shared", "downloaded", "viewed", "failed"])
        .describe("The type of event being logged."),

    fileId: z.string().uuid().optional()
        .describe("The UUID of the file involved in the event, if applicable."),

    userId: z.string().uuid().optional()
        .describe("The UUID of the user involved in the event."),

    description: z.string().optional()
        .describe("A detailed description of the event."),

    ipAddress: z.string().optional()
        .describe("The IP address from where the event originated."),

    timestamp: z.date().default(new Date())
        .describe("The date and time when the event occurred."),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

/**
 * Schema for FileMetadata, representing additional metadata for a file.
 */
export const FileMetadataSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file this metadata applies to."),

    metadata: z.record(z.string(), z.any())
        .describe("A key-value store of metadata attributes for the file (e.g., author, tags, project)."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when the metadata was created."),
});

export type FileMetadata = z.infer<typeof FileMetadataSchema>;

/**
 * Schema for AccessControlPolicy, representing advanced access control rules for files.
 */
export const AccessControlPolicySchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file."),

    policyName: z.string().min(1, "Policy name is required.")
        .describe("The name of the access control policy."),

    conditions: z.object({
        allowedIPs: z.array(z.string()).optional()
            .describe("Optional array of allowed IP addresses for accessing the file."),

        expiration: z.date().optional()
            .describe("Optional expiration date for file access."),

        maxAccesses: z.number().optional()
            .describe("Optional limit on the number of accesses."),

        passcode: z.string().optional()
            .describe("Optional passcode for accessing the file."),

        allowedRegions: z.array(z.string()).optional()
            .describe("Optional array of allowed regions."),

        timeRange: z.object({
            startTime: z.date().optional(),
            endTime: z.date().optional(),
        }).optional().describe("Optional time range during which the file can be accessed."),
    }).describe("Conditions for the access control policy."),
});

export type AccessControlPolicy = z.infer<typeof AccessControlPolicySchema>;

/**
 * Schema for FileEncryption, representing the encryption status and methods for files.
 */
export const FileEncryptionSchema = RecordSchema.extend({
    fileId: z.string().uuid()
        .describe("The unique identifier (UUID) of the file."),

    encryptionMethod: z.enum(["AES", "RSA", "SHA-256", "None"])
        .describe("The encryption method used to protect the file."),

    isEncrypted: z.boolean().default(false)
        .describe("Indicates whether the file is currently encrypted."),

    encryptionKey: z.string().optional()
        .describe("The encryption key or reference to the key for decrypting the file."),
});

export type FileEncryption = z.infer<typeof FileEncryptionSchema>;

/**
 * Schema for Quota, representing storage quotas or limits on file storage for users or groups.
 */
export const QuotaSchema = RecordSchema.extend({
    userId: z.string().uuid().optional()
        .describe("The UUID of the user to whom the quota applies."),

    groupId: z.string().uuid().optional()
        .describe("The UUID of the group to whom the quota applies."),

    totalStorageLimit: z.number()
        .describe("The total storage limit in bytes."),

    usedStorage: z.number().default(0)
        .describe("The amount of storage currently used in bytes."),

    lastUpdated: z.date().default(new Date())
        .describe("The date and time when the quota information was last updated."),
});

export type Quota = z.infer<typeof QuotaSchema>;

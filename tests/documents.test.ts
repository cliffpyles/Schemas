// filepath: ./tests/documents.test.ts
import { describe, it, expect } from "vitest";
import {
    FileSchema,
    FileCategorySchema,
    FileVersionSchema,
    FileHistorySchema,
    UserActivitySchema,
    FileCommentSchema,
    EventNotificationSchema,
    FolderSchema,
    SharedLinkSchema,
    DownloadRequestSchema,
    AuditLogSchema,
    FileMetadataSchema,
    AccessControlPolicySchema,
    FileEncryptionSchema,
    QuotaSchema,
} from "../src/documents";

describe("FileSchema", () => {
    it("should validate a valid file object", () => {
        const file = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileName: "document.pdf",
            fileType: "application/pdf",
            fileSize: 1024,
            fileUrl: "https://example.com/document.pdf",
            isPublic: true,
            createdAt: new Date(),
        };
        expect(() => FileSchema.parse(file)).not.toThrow();
    });

    it("should throw an error for an invalid file object", () => {
        const invalidFile = {
            fileName: "document.pdf",
        };
        expect(() => FileSchema.parse(invalidFile)).toThrow();
    });
});

describe("FileCategorySchema", () => {
    it("should validate a valid file category", () => {
        const fileCategory = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Reports",
            createdAt: new Date(),
        };
        expect(() => FileCategorySchema.parse(fileCategory)).not.toThrow();
    });

    it("should throw an error for an invalid file category", () => {
        const invalidFileCategory = { name: "" };
        expect(() => FileCategorySchema.parse(invalidFileCategory)).toThrow();
    });
});

describe("FileVersionSchema", () => {
    it("should validate a valid file version", () => {
        const fileVersion = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            version: "v1.0",
            fileUrl: "https://example.com/version1.pdf",
            createdAt: new Date(),
        };
        expect(() => FileVersionSchema.parse(fileVersion)).not.toThrow();
    });

    it("should throw an error for an invalid file version", () => {
        const invalidFileVersion = {
            fileId: "123e4567-e89b-12d3-a456-426614174001",
        };
        expect(() => FileVersionSchema.parse(invalidFileVersion)).toThrow();
    });
});

describe("FileHistorySchema", () => {
    it("should validate a valid file history", () => {
        const fileHistory = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            action: "created",
            performedBy: "123e4567-e89b-12d3-a456-426614174002",
            timestamp: new Date(),
        };
        expect(() => FileHistorySchema.parse(fileHistory)).not.toThrow();
    });

    it("should throw an error for an invalid file history", () => {
        const invalidFileHistory = {
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            action: "unknown",
        };
        expect(() => FileHistorySchema.parse(invalidFileHistory)).toThrow();
    });
});

describe("UserActivitySchema", () => {
    it("should validate a valid user activity", () => {
        const userActivity = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            userId: "123e4567-e89b-12d3-a456-426614174001",
            fileId: "123e4567-e89b-12d3-a456-426614174002",
            action: "viewed",
            timestamp: new Date(),
        };
        expect(() => UserActivitySchema.parse(userActivity)).not.toThrow();
    });

    it("should throw an error for an invalid user activity", () => {
        const invalidUserActivity = {
            userId: "123e4567-e89b-12d3-a456-426614174001",
        };
        expect(() => UserActivitySchema.parse(invalidUserActivity)).toThrow();
    });
});

describe("FileCommentSchema", () => {
    it("should validate a valid file comment", () => {
        const fileComment = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            authorId: "123e4567-e89b-12d3-a456-426614174002",
            comment: "This is a test comment.",
            createdAt: new Date(),
        };
        expect(() => FileCommentSchema.parse(fileComment)).not.toThrow();
    });

    it("should throw an error for an invalid file comment", () => {
        const invalidFileComment = { fileId: "123e4567-e89b-12d3-a456-426614174001" };
        expect(() => FileCommentSchema.parse(invalidFileComment)).toThrow();
    });
});

describe("EventNotificationSchema", () => {
    it("should validate a valid event notification", () => {
        const eventNotification = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            eventType: "uploaded",
            recipientId: "123e4567-e89b-12d3-a456-426614174002",
            message: "Your file has been successfully uploaded.",
            createdAt: new Date(),
        };
        expect(() => EventNotificationSchema.parse(eventNotification)).not.toThrow();
    });

    it("should throw an error for an invalid event notification", () => {
        const invalidEventNotification = {
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            eventType: "invalid-event",
        };
        expect(() => EventNotificationSchema.parse(invalidEventNotification)).toThrow();
    });
});

describe("FolderSchema", () => {
    it("should validate a valid folder object", () => {
        const folder = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "My Documents",
            createdAt: new Date(),
            accessManagement: {
                accessType: "private",
            },
        };
        expect(() => FolderSchema.parse(folder)).not.toThrow();
    });

    it("should throw an error for an invalid folder object", () => {
        const invalidFolder = { name: "" };
        expect(() => FolderSchema.parse(invalidFolder)).toThrow();
    });
});

describe("SharedLinkSchema", () => {
    it("should validate a valid shared link", () => {
        const sharedLink = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            url: "https://example.com/shared-link",
            expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour in the future
            createdAt: new Date(),
        };
        expect(() => SharedLinkSchema.parse(sharedLink)).not.toThrow();
    });

    it("should throw an error for an invalid shared link", () => {
        const invalidSharedLink = {
            fileId: "123e4567-e89b-12d3-a456-426614174001",
        };
        expect(() => SharedLinkSchema.parse(invalidSharedLink)).toThrow();
    });
});

describe("DownloadRequestSchema", () => {
    it("should validate a valid download request", () => {
        const downloadRequest = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            requestedBy: "123e4567-e89b-12d3-a456-426614174002",
            status: "pending",
            requestedAt: new Date(),
            createdAt: new Date(),
        };
        expect(() => DownloadRequestSchema.parse(downloadRequest)).not.toThrow();
    });

    it("should throw an error for an invalid download request", () => {
        const invalidDownloadRequest = { fileId: "123e4567-e89b-12d3-a456-426614174001" };
        expect(() => DownloadRequestSchema.parse(invalidDownloadRequest)).toThrow();
    });
});

describe("AuditLogSchema", () => {
    it("should validate a valid audit log entry", () => {
        const auditLog = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            eventType: "created",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            userId: "123e4567-e89b-12d3-a456-426614174002",
            description: "File was created",
            ipAddress: "192.168.0.1",
            timestamp: new Date(),
            createdAt: new Date(),
        };
        expect(() => AuditLogSchema.parse(auditLog)).not.toThrow();
    });

    it("should throw an error for an invalid audit log entry", () => {
        const invalidAuditLog = { eventType: "unknown" };
        expect(() => AuditLogSchema.parse(invalidAuditLog)).toThrow();
    });
});

describe("FileMetadataSchema", () => {
    it("should validate valid file metadata", () => {
        const fileMetadata = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            metadata: {
                author: "John Doe",
                tags: ["report", "pdf"],
            },
            createdAt: new Date(),
        };
        expect(() => FileMetadataSchema.parse(fileMetadata)).not.toThrow();
    });

    it("should throw an error for invalid file metadata", () => {
        const invalidFileMetadata = { metadata: { author: "John Doe" } };
        expect(() => FileMetadataSchema.parse(invalidFileMetadata)).toThrow();
    });
});

describe("AccessControlPolicySchema", () => {
    it("should validate a valid access control policy", () => {
        const accessControlPolicy = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            policyName: "Restricted Access",
            conditions: {
                allowedIPs: ["192.168.1.1"],
                expiration: new Date(Date.now() + 24 * 3600 * 1000), // 24 hours in the future
                maxAccesses: 5,
            },
            createdAt: new Date(),
        };
        expect(() => AccessControlPolicySchema.parse(accessControlPolicy)).not.toThrow();
    });

    it("should throw an error for an invalid access control policy", () => {
        const invalidAccessControlPolicy = { policyName: "Restricted Access" };
        expect(() => AccessControlPolicySchema.parse(invalidAccessControlPolicy)).toThrow();
    });
});

describe("FileEncryptionSchema", () => {
    it("should validate a valid file encryption object", () => {
        const fileEncryption = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            fileId: "123e4567-e89b-12d3-a456-426614174001",
            encryptionMethod: "AES",
            isEncrypted: true,
            createdAt: new Date(),
        };
        expect(() => FileEncryptionSchema.parse(fileEncryption)).not.toThrow();
    });

    it("should throw an error for an invalid file encryption object", () => {
        const invalidFileEncryption = { encryptionMethod: "Unknown" };
        expect(() => FileEncryptionSchema.parse(invalidFileEncryption)).toThrow();
    });
});

describe("QuotaSchema", () => {
    it("should validate a valid quota object", () => {
        const quota = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            userId: "123e4567-e89b-12d3-a456-426614174001",
            totalStorageLimit: 1000000000, // 1GB
            usedStorage: 500000000, // 500MB
            createdAt: new Date(),
        };
        expect(() => QuotaSchema.parse(quota)).not.toThrow();
    });

    it("should throw an error for an invalid quota object", () => {
        const invalidQuota = { totalStorageLimit: "1GB" };
        expect(() => QuotaSchema.parse(invalidQuota)).toThrow();
    });
});

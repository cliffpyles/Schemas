// filepath: ./tests/communication.test.ts
import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
    MessageSchema,
    ConversationSchema,
    NotificationSchema,
    ChannelSchema,
    ReactionSchema,
    ThreadSchema,
    MentionSchema,
    TypingIndicatorSchema,
} from "../src/communication";

describe("MessageSchema", () => {
    it("should validate a valid message object", () => {
        const message = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            senderId: "123e4567-e89b-12d3-a456-426614174001",
            receiverId: "123e4567-e89b-12d3-a456-426614174002",
            content: "Hello, world!",
            sentAt: new Date(),
            conversationId: "123e4567-e89b-12d3-a456-426614174003",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => MessageSchema.parse(message)).not.toThrow();
    });

    it("should throw an error for an invalid message object", () => {
        const invalidMessage = {
            senderId: "invalid-uuid",
            receiverId: "123e4567-e89b-12d3-a456-426614174002",
            content: "",
        };
        expect(() => MessageSchema.parse(invalidMessage)).toThrow();
    });
});

describe("ConversationSchema", () => {
    it("should validate a valid conversation object", () => {
        const conversation = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            participants: [
                "123e4567-e89b-12d3-a456-426614174001",
                "123e4567-e89b-12d3-a456-426614174002",
            ],
            lastMessageAt: new Date(),
            messages: ["123e4567-e89b-12d3-a456-426614174004"],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => ConversationSchema.parse(conversation)).not.toThrow();
    });

    it("should throw an error for a conversation with less than two participants", () => {
        const invalidConversation = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            participants: ["123e4567-e89b-12d3-a456-426614174001"],
            createdAt: new Date(),
        };
        expect(() => ConversationSchema.parse(invalidConversation)).toThrow();
    });
});

describe("NotificationSchema", () => {
    it("should validate a valid notification object", () => {
        const notification = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            userId: "123e4567-e89b-12d3-a456-426614174001",
            title: "New message received",
            content: "You have a new message from John.",
            type: "info",
            sentAt: new Date(),
            createdAt: new Date(),
        };
        expect(() => NotificationSchema.parse(notification)).not.toThrow();
    });

    it("should throw an error for a notification missing required fields", () => {
        const invalidNotification = {
            userId: "123e4567-e89b-12d3-a456-426614174001",
            type: "info",
        };
        expect(() => NotificationSchema.parse(invalidNotification)).toThrow();
    });
});

describe("ChannelSchema", () => {
    it("should validate a valid channel object", () => {
        const channel = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "General",
            description: "General discussion",
            participants: ["123e4567-e89b-12d3-a456-426614174001"],
            isPrivate: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => ChannelSchema.parse(channel)).not.toThrow();
    });

    it("should throw an error for a channel with missing required fields", () => {
        const invalidChannel = {
            description: "No name provided",
        };
        expect(() => ChannelSchema.parse(invalidChannel)).toThrow();
    });
});

describe("ReactionSchema", () => {
    it("should validate a valid reaction object", () => {
        const reaction = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            messageId: "123e4567-e89b-12d3-a456-426614174001",
            userId: "123e4567-e89b-12d3-a456-426614174002",
            reactionType: "👍",
            createdAt: new Date(),
            createdAt: new Date(),
        };
        expect(() => ReactionSchema.parse(reaction)).not.toThrow();
    });

    it("should throw an error for a reaction with invalid fields", () => {
        const invalidReaction = {
            messageId: "123e4567-e89b-12d3-a456-426614174001",
            userId: "123e4567-e89b-12d3-a456-426614174002",
            reactionType: "",
        };
        expect(() => ReactionSchema.parse(invalidReaction)).toThrow();
    });
});

describe("ThreadSchema", () => {
    it("should validate a valid thread object", () => {
        const thread = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            parentMessageId: "123e4567-e89b-12d3-a456-426614174001",
            messages: ["123e4567-e89b-12d3-a456-426614174002"],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        expect(() => ThreadSchema.parse(thread)).not.toThrow();
    });

    it("should throw an error for a thread with missing fields", () => {
        const invalidThread = {
            messages: ["123e4567-e89b-12d3-a456-426614174002"],
        };
        expect(() => ThreadSchema.parse(invalidThread)).toThrow();
    });
});

describe("MentionSchema", () => {
    it("should validate a valid mention object", () => {
        const mention = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            messageId: "123e4567-e89b-12d3-a456-426614174001",
            mentionedUserId: "123e4567-e89b-12d3-a456-426614174002",
            mentionedByUserId: "123e4567-e89b-12d3-a456-426614174003",
            createdAt: new Date(),
        };
        expect(() => MentionSchema.parse(mention)).not.toThrow();
    });

    it("should throw an error for an invalid mention object", () => {
        const invalidMention = {
            mentionedUserId: "123e4567-e89b-12d3-a456-426614174002",
        };
        expect(() => MentionSchema.parse(invalidMention)).toThrow();
    });
});

describe("TypingIndicatorSchema", () => {
    it("should validate a valid typing indicator object", () => {
        const typingIndicator = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            userId: "123e4567-e89b-12d3-a456-426614174001",
            conversationId: "123e4567-e89b-12d3-a456-426614174002",
            startedAt: new Date(),
            createdAt: new Date(),
        };
        expect(() => TypingIndicatorSchema.parse(typingIndicator)).not.toThrow();
    });

    it("should throw an error for a typing indicator with missing fields", () => {
        const invalidTypingIndicator = {
            userId: "123e4567-e89b-12d3-a456-426614174001",
        };
        expect(() => TypingIndicatorSchema.parse(invalidTypingIndicator)).toThrow();
    });
});

import { z } from "zod";
import { RecordSchema } from "./record";

/**
 * Schema for a Message, representing a communication sent from one user to another.
 */
export const MessageSchema = RecordSchema.extend({
    senderId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who sent the message."),

    receiverId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who received the message."),

    content: z.string().min(1, "Message content is required.")
        .describe("The content of the message."),

    sentAt: z.date().default(new Date())
        .describe("The date and time when the message was sent."),

    readAt: z.date().optional()
        .describe("The date and time when the message was read, if applicable."),

    conversationId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the conversation this message belongs to, if applicable."),
});

export type Message = z.infer<typeof MessageSchema>;

/**
 * Schema for a Conversation, representing a thread of messages between multiple users.
 */
export const ConversationSchema = RecordSchema.extend({
    participants: z.array(z.string().uuid()).min(2)
        .describe("An array of user UUIDs representing the participants in the conversation."),

    lastMessageAt: z.date().optional()
        .describe("The date and time when the last message in the conversation was sent."),

    messages: z.array(z.string().uuid()).optional()
        .describe("An array of message UUIDs associated with this conversation."),
});

export type Conversation = z.infer<typeof ConversationSchema>;

/**
 * Schema for a Notification, representing an alert or message sent to a user.
 */
export const NotificationSchema = RecordSchema.extend({
    userId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user to whom the notification was sent."),

    title: z.string().min(1, "Notification title is required.")
        .describe("The title of the notification."),

    content: z.string().optional()
        .describe("The content or body of the notification."),

    type: z.enum(["info", "warning", "error"]).default("info")
        .describe("The type of the notification (e.g., informational, warning, or error)."),

    sentAt: z.date().default(new Date())
        .describe("The date and time when the notification was sent."),

    readAt: z.date().optional()
        .describe("The date and time when the notification was read."),

    actionUrl: z.string().url().optional()
        .describe("Optional URL to provide a call to action or further information related to the notification."),
});

export type Notification = z.infer<typeof NotificationSchema>;

/**
 * Schema for a Channel, representing a group or topic-based communication space.
 */
export const ChannelSchema = RecordSchema.extend({
    name: z.string().min(1, "Channel name is required.")
        .describe("The name of the communication channel."),

    description: z.string().optional()
        .describe("A short description of the channel's purpose or topic."),

    participants: z.array(z.string().uuid()).optional()
        .describe("An optional array of user UUIDs participating in the channel."),

    isPrivate: z.boolean().default(false)
        .describe("Indicates whether the channel is private (only accessible by invited participants)."),

    messages: z.array(z.string().uuid()).optional()
        .describe("An optional array of message UUIDs associated with the channel."),
});

export type Channel = z.infer<typeof ChannelSchema>;

/**
 * Schema for a Reaction, representing a user's reaction (e.g., emoji) to a message.
 */
export const ReactionSchema = RecordSchema.extend({
    messageId: z.string().uuid()
        .describe("The unique identifier (UUID) of the message this reaction is associated with."),

    userId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who reacted."),

    reactionType: z.string().min(1)
        .describe("The type of reaction (e.g., emoji, like, heart, etc.)."),

    createdAt: z.date().default(new Date())
        .describe("The date and time when the reaction was made."),
});

export type Reaction = z.infer<typeof ReactionSchema>;

/**
 * Schema for a Thread, representing a nested discussion within a message.
 */
export const ThreadSchema = RecordSchema.extend({
    parentMessageId: z.string().uuid()
        .describe("The unique identifier (UUID) of the parent message that started this thread."),

    messages: z.array(z.string().uuid())
        .describe("An array of message UUIDs that are part of this thread."),
});

export type Thread = z.infer<typeof ThreadSchema>;

/**
 * Schema for a Mention, representing a user mentioned in a message.
 */
export const MentionSchema = RecordSchema.extend({
    messageId: z.string().uuid()
        .describe("The unique identifier (UUID) of the message where the user was mentioned."),

    mentionedUserId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who was mentioned."),

    mentionedByUserId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who mentioned the other user."),
});

export type Mention = z.infer<typeof MentionSchema>;

/**
 * Schema for a TypingIndicator, representing when a user is typing in a conversation or channel.
 */
export const TypingIndicatorSchema = RecordSchema.extend({
    conversationId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the conversation where the user is typing."),

    channelId: z.string().uuid().optional()
        .describe("The unique identifier (UUID) of the channel where the user is typing."),

    userId: z.string().uuid()
        .describe("The unique identifier (UUID) of the user who is currently typing."),

    startedAt: z.date().default(new Date())
        .describe("The date and time when the typing indicator started."),

    endedAt: z.date().optional()
        .describe("The date and time when the typing indicator ended, if applicable."),
});

export type TypingIndicator = z.infer<typeof TypingIndicatorSchema>;


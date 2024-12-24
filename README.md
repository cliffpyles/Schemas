# Schemas

A repository of Zod schemas, organized into categories like communication, content, and productivity. It provides standardized, modular, and validated data structures for diverse applications.

## Communication

Schemas related to messaging, notifications, and group communications. These schemas define structures for various types of user interactions and communication channels.

- **Message**: Schema for a communication sent from one user to another.
- **Conversation**: Schema for a thread of messages between multiple users.
- **Notification**: Schema for an alert or message sent to a user.
- **Channel**: Schema for a group or topic-based communication space.
- **Reaction**: Schema for a user's reaction (e.g., emoji) to a message.
- **Thread**: Schema for a nested discussion within a message.
- **Mention**: Schema for representing a user mentioned in a message.
- **Typing Indicator**: Schema for when a user is typing in a conversation or channel.

## Content

Schemas for managing media assets, taxonomies, content types, and workflows in content management systems. These schemas support the organization, localization, and versioning of content.

- **Media Asset**: Schema for media files like images, videos, or documents.
- **Taxonomy**: Schema for structured classification systems (e.g., categories or tags).
- **Category**: Schema for a hierarchical structure within a taxonomy.
- **Tag**: Schema for non-hierarchical labels used to classify content.
- **Author**: Schema for the creator of content in a CMS.
- **Content Version**: Schema for a version of a content entry.
- **Content Workflow**: Schema for the workflow of content creation, review, and approval.
- **Content Relation**: Schema for relationships between content entries.
- **Comment**: Schema for user-generated feedback or discussion on content.
- **Content Localization**: Schema for localized versions of content.
- **Editor**: Schema for the editor used for creating and editing content.
- **View Template**: Schema for layouts or templates used to display content.
- **Page**: Schema for a content page displaying entries.
- **Content Editor State**: Schema for the state of content during editing.
- **Content Preview**: Schema for a preview state for viewing content before publishing.
- **Content Field**: Schema for individual fields within a content type.
- **Content Type**: Schema for the structure or blueprint for content types.
- **Content Entry**: Schema for an individual piece of content within a type.

## Documents

Schemas for organizing, managing, and sharing files and documents. Includes support for versioning, access controls, and file metadata.

- **File**: Schema for documents or media files.
- **File Category**: Schema for organizing files by category.
- **File Version**: Schema for different versions of a file.
- **File History**: Schema for tracking actions performed on a file.
- **User Activity**: Schema for user activity related to files.
- **File Comment**: Schema for comments made on files.
- **Event Notification**: Schema for notifications related to file events.
- **Folder**: Schema for a hierarchical structure to organize files.
- **Shared Link**: Schema for shareable links with configurable access settings.
- **Download Request**: Schema for user-initiated requests to download files.
- **Audit Log**: Schema for logging activities and security events.
- **File Metadata**: Schema for additional metadata for files.
- **Access Control Policy**: Schema for advanced access control rules.
- **File Encryption**: Schema for encryption methods and status for files.
- **Quota**: Schema for storage quotas or limits for users or groups.

## Forms

Schemas for building and managing dynamic forms. These schemas cover layout, validation, field dependencies, and form actions.

- **Form Field**: Schema for individual form field components.
- **Form Layout Config**: Schema for granular layout control for form fields.
- **Form Section**: Schema for sections grouping related fields in forms.
- **Form Layout**: Schema for overall form structure and layout.
- **Form Actions**: Schema for actions like submit or reset associated with forms.
- **Form Dependencies**: Schema for field dependencies within a form.
- **Repeating Field Group**: Schema for dynamically repeating groups of fields.
- **Form Restraints**: Schema for constraints and limits for form fields.
- **Form**: Schema for the entire form structure, including layout and validations.

## Learning

Schemas related to learning and education, including tools for studying, creating study plans, and tracking progress.

- **Flash Card**: Schema for study tools presenting information in two parts.
- **Topic**: Schema for subjects organizing learning material.
- **Note**: Schema for text content related to a topic.
- **Definition List**: Schema for a collection of terms and definitions.
- **Cheatsheet**: Schema for structured sections of study material.
- **Mindmap**: Schema for visual representations of connected ideas or concepts.
- **Diagram**: Schema for graphical representations of concepts.
- **Bookmark**: Schema for saved references to content like URLs or documents.
- **Study Plan**: Schema for goals and tasks organized for learning.
- **Study Session**: Schema for sessions spent studying or practicing a topic.

## Productivity

Schemas designed for task management, project tracking, and productivity optimization. They include structures for tasks, projects, time tracking, and collaboration.

- **Task**: Schema for a unit of work requiring completion.
- **Task List**: Schema for ordered or categorized lists of tasks.
- **Milestone**: Schema for significant events or objectives in projects.
- **Subtask**: Schema for smaller tasks within larger parent tasks.
- **Comment**: Schema for feedback or discussion related to tasks or projects.
- **Attachment**: Schema for files or links associated with tasks or projects.
- **Time Log**: Schema for tracking time spent on tasks or projects.
- **Tag**: Schema for labels used for categorization.
- **Event**: Schema for scheduled occurrences related to tasks or projects.
- **Reminder**: Schema for scheduled alerts related to tasks or projects.
- **Project**: Schema for collections of tasks and objectives.

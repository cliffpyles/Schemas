import { z } from "zod";
import {
    RecordSchema,
    OwnedSchema
} from "./record";

export const ApplicationMetadataSchema = z.object({
    isPublished: z.boolean().default(false).describe("Indicates if the application is published."),
    platform: z.enum(["web", "mobile", "desktop", "server"]).describe("The platform the application is designed for."),
    releaseDate: z.date().optional().describe("The release date of the application."),
    supportedLanguages: z.array(z.string()).default(["en"]).describe("The languages supported by the application."),
    license: z.enum(["MIT", "GPL", "Apache", "Proprietary"]).optional().describe("The license type of the application."),
    developer: z.string().optional().describe("The name of the developer or organization."),
    category: z.enum(["productivity", "entertainment", "education", "utility", "other"]).optional().describe("The category of the application."),
    ratings: z
        .array(
            z.object({
                userId: z.string().uuid().describe("The ID of the user who rated."),
                score: z.number().min(1).max(5).describe("The rating score."),
                comment: z.string().optional().describe("Optional comment from the user."),
            })
        )
        .optional()
        .describe("Ratings given to the application by users."),
});

export const ApplicationConfigurationSchema = z.object({
    environment: z.enum(["development", "staging", "production"]).describe("The deployment environment of the application."),
    debugMode: z.boolean().default(false).describe("Indicates whether debug mode is enabled."),
    apiEndpoints: z
        .record(z.string(), z.string())
        .optional()
        .describe("A key-value map of API endpoints for the application."),
    featureFlags: z
        .record(z.string(), z.boolean())
        .default({})
        .describe("Feature flags for toggling application features."),
});

export const ApplicationComponentSchema = z.object({
    name: z.string().describe("The name of the component."),
    version: z.string().describe("The version of the component."),
    status: z.enum(["active", "inactive", "deprecated"]).describe("The status of the component."),
});

export const ApplicationRouteSchema = z.object({
    path: z.string().describe("The route path."),
    component: z.string().describe("The name of the component for the route."),
});

export const ApplicationModelSchema = z.object({
    name: z.string().describe("The name of the model."),
    fields: z.record(z.string(), z.string()).describe("Fields and their types in the model."),
});

export const ApplicationServiceSchema = z.object({
    name: z.string().describe("The name of the service."),
    endpoint: z.string().optional().describe("The endpoint the service interacts with."),
    methods: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])).default([]).describe("HTTP methods supported by the service."),
});

export const ApplicationSchemaSchema = z.object({
    name: z.string().describe("The name of the schema."),
    definition: z.record(z.string(), z.any()).describe("The definition of the schema."),
});

export const ApplicationMiddlewareSchema = z.object({
    name: z.string().describe("The name of the middleware."),
    description: z.string().optional().describe("A brief description of what the middleware does."),
});

export const ApplicationPluginSchema = z.object({
    name: z.string().describe("The name of the plugin."),
    version: z.string().default("1.0.0").describe("The version of the plugin."),
    configuration: z.record(z.string(), z.any()).optional().describe("Plugin-specific configuration options."),
});

export const ApplicationSchema = RecordSchema
    .merge(OwnedSchema)
    .extend({
        metadata: ApplicationMetadataSchema.optional().describe("Metadata related to the application."),
        configurations: ApplicationConfigurationSchema.optional().describe("The configurations of the application."),
        components: z.array(ApplicationComponentSchema).optional().describe("The components that make up the application."),
        state: z.object({}).optional().describe("The state of the application."),
        routes: z.array(ApplicationRouteSchema).default([]).optional().describe("The routes defined in the application."),
        models: z.array(ApplicationModelSchema).default([]).optional().describe("The models used in the application."),
        services: z.array(ApplicationServiceSchema).default([]).describe("The services available in the application."),
        schemas: z.array(ApplicationSchemaSchema).default([]).optional().describe("The schemas defined in the application."),
        middleware: z.array(ApplicationMiddlewareSchema).default([]).optional().describe("Middleware functions used in the application."),
        plugins: z.array(ApplicationPluginSchema).default([]).optional().describe("Plugins integrated into the application."),
    });

export type ApplicationMetadata = z.infer<typeof ApplicationMetadataSchema>;
export type ApplicationConfiguration = z.infer<typeof ApplicationConfigurationSchema>;
export type ApplicationComponent = z.infer<typeof ApplicationComponentSchema>;
export type ApplicationRoute = z.infer<typeof ApplicationRouteSchema>;
export type ApplicationModel = z.infer<typeof ApplicationModelSchema>;
export type ApplicationService = z.infer<typeof ApplicationServiceSchema>;
export type ApplicationSchemaType = z.infer<typeof ApplicationSchemaSchema>;
export type ApplicationMiddleware = z.infer<typeof ApplicationMiddlewareSchema>;
export type ApplicationPlugin = z.infer<typeof ApplicationPluginSchema>;
export type Application = z.infer<typeof ApplicationSchema>;

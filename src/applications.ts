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

export const ApplicationTestSchema = z.object({
    name: z.string().describe("The name of the test."),
    type: z.enum(["unit", "integration", "e2e"]).describe("The type of the test."),
    status: z.enum(["passed", "failed", "skipped"]).optional().describe("The current status of the test."),
});

export const ApplicationBuildSystemSchema = z.object({
    tool: z.string().describe("The build tool used (e.g., Webpack, Rollup)."),
    configuration: z.record(z.string(), z.any()).optional().describe("Build tool configuration options."),
});

export const ApplicationDependencySchema = z.object({
    name: z.string().describe("The name of the dependency."),
    version: z.string().describe("The version of the dependency."),
    type: z.enum(["runtime", "development", "peer"]).describe("The type of dependency."),
});

export const ApplicationErrorHandlerSchema = z.object({
    type: z.enum(["global", "component", "service"]).describe("The type of error handler."),
    description: z.string().optional().describe("Details about the error-handling logic."),
});

export const ApplicationAuthenticationSchema = z.object({
    strategies: z.array(
        z.enum(["OAuth", "JWT", "BasicAuth", "Session"]).describe("The authentication strategies supported.")
    ).default([]).describe("Authentication strategies."),
    isEnabled: z.boolean().default(true).describe("Indicates if authentication is enabled."),
});

export const ApplicationAuthorizationSchema = z.object({
    roles: z.array(
        z.object({
            name: z.string().describe("The name of the role."),
            permissions: z.array(z.string()).default([]).describe("Permissions associated with the role."),
        })
    ).default([]).describe("Roles and their permissions."),
});

export const ApplicationDocumentationSchema = z.object({
    format: z.enum(["Markdown", "HTML", "JSON"]).optional().describe("The format of the documentation."),
    location: z.string().describe("The location of the documentation files."),
});

export const ApplicationHookSchema = z.object({
    name: z.string().describe("The name of the hook."),
    trigger: z.string().describe("The event or lifecycle stage that triggers the hook."),
    description: z.string().optional().describe("Details about the hook."),
});

export const ApplicationStateManagementSchema = z.object({
    library: z.string().describe("The library used for state management (e.g., Redux, MobX, Zustand)."),
    stateStructure: z.record(z.string(), z.any()).optional().describe("The structure of the global state."),
});

export const ApplicationInternationalizationSchema = z.object({
    defaultLanguage: z.string().default("en").describe("The default language of the application."),
    supportedLanguages: z.array(z.string()).default(["en"]).describe("The list of supported languages."),
});

export const ApplicationStaticAssetsSchema = z.object({
    images: z.array(z.string()).default([]).describe("List of image assets."),
    stylesheets: z.array(z.string()).default([]).describe("List of stylesheet assets."),
    scripts: z.array(z.string()).default([]).describe("List of script assets."),
});

export const ApplicationTransformerSchema = z.object({
    name: z.string().describe("The name of the transformer."),
    inputType: z.string().describe("The type of input the transformer expects."),
    outputType: z.string().describe("The type of output the transformer produces."),
    description: z.string().optional().describe("A brief description of the transformer."),
    transformationLogic: z.string().optional().describe("Details about the logic or method used for transformation."),
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
        tests: z.array(ApplicationTestSchema).default([]).optional().describe("Tests written for the application."),
        buildSystem: ApplicationBuildSystemSchema.optional().describe("Details about the build system."),
        dependencies: z.array(ApplicationDependencySchema).default([]).describe("The application's dependencies."),
        errorHandlers: z.array(ApplicationErrorHandlerSchema).default([]).optional().describe("Error-handling mechanisms in the application."),
        authentication: ApplicationAuthenticationSchema.optional().describe("Authentication-related configurations."),
        authorization: ApplicationAuthorizationSchema.optional().describe("Authorization configurations."),
        documentation: ApplicationDocumentationSchema.optional().describe("Documentation details for the application."),
        hooks: z.array(ApplicationHookSchema).default([]).optional().describe("Custom hooks or lifecycle hooks in the application."),
        stateManagement: ApplicationStateManagementSchema.optional().describe("State management configurations."),
        internationalization: ApplicationInternationalizationSchema.optional().describe("Internationalization-related configurations."),
        staticAssets: ApplicationStaticAssetsSchema.optional().describe("Details about static assets."),
        transformers: z.array(ApplicationTransformerSchema).default([]).optional().describe("Transformers used for data transformation."),
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
export type ApplicationTest = z.infer<typeof ApplicationTestSchema>;
export type ApplicationBuildSystem = z.infer<typeof ApplicationBuildSystemSchema>;
export type ApplicationDependency = z.infer<typeof ApplicationDependencySchema>;
export type ApplicationErrorHandler = z.infer<typeof ApplicationErrorHandlerSchema>;
export type ApplicationAuthentication = z.infer<typeof ApplicationAuthenticationSchema>;
export type ApplicationAuthorization = z.infer<typeof ApplicationAuthorizationSchema>;
export type ApplicationDocumentation = z.infer<typeof ApplicationDocumentationSchema>;
export type ApplicationHook = z.infer<typeof ApplicationHookSchema>;
export type ApplicationStateManagement = z.infer<typeof ApplicationStateManagementSchema>;
export type ApplicationInternationalization = z.infer<typeof ApplicationInternationalizationSchema>;
export type ApplicationStaticAssets = z.infer<typeof ApplicationStaticAssetsSchema>;
export type ApplicationTransformer = z.infer<typeof ApplicationTransformerSchema>;
export type Application = z.infer<typeof ApplicationSchema>;
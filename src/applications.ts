import { z } from "zod";
import {
    RecordSchema,
    OwnedSchema
} from "./record";

export const ApplicationMetadataSchema = z.object({
    isPublished: z.boolean().default(false).describe("Indicates if the application is published."),
    publishedBy: z.string().optional().describe("The person or entity that authorized publication."),
    platform: z.enum(["web", "mobile", "desktop", "server"]).describe("The platform the application is designed for."),
    releaseDate: z.date().optional().describe("The release date of the application."),
    supportedLanguages: z.array(z.object({
        code: z.string().describe("Language code (e.g., en-US)."),
        name: z.string().optional().describe("Readable language name."),
    })).default([{ code: "en" }]).describe("The languages supported by the application."),
    license: z.enum(["MIT", "GPL", "Apache", "Proprietary"]).optional().describe("The license type of the application."),
    developer: z.object({
        name: z.string().describe("The name of the developer or organization."),
        contact: z.string().optional().describe("Contact email or URL."),
    }).optional(),
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
    averageRating: z.number().min(1).max(5).optional().describe("The average rating of the application."),
});

export const ApplicationConfigurationSchema = z.object({
    environment: z.enum(["development", "staging", "production"]).describe("The deployment environment of the application."),
    debugMode: z.boolean().default(false).describe("Indicates whether debug mode is enabled."),
    apiEndpoints: z
        .record(
            z.string(),
            z.object({
                url: z.string().describe("The endpoint URL."),
                requiresAuth: z.boolean().default(false).describe("Indicates if authentication is required."),
                rateLimit: z.number().optional().describe("Rate limit for this endpoint."),
            })
        )
        .optional()
        .describe("A key-value map of API endpoints for the application."),
    featureFlags: z
        .record(
            z.string(),
            z.object({
                isEnabled: z.boolean().default(false).describe("Indicates if the feature is enabled."),
                description: z.string().optional().describe("Description of the feature."),
                createdDate: z.date().optional().describe("Date the feature flag was created."),
            })
        )
        .default({})
        .describe("Feature flags for toggling application features."),
});

export const ApplicationComponentSchema = z.object({
    name: z.string().describe("The name of the component."),
    version: z.string().describe("The version of the component."),
    status: z.enum(["active", "inactive", "deprecated"]).describe("The status of the component."),
    dependencies: z.array(z.string()).optional().describe("Names of components this component depends on."),
    documentation: z.string().optional().describe("Link to the component's documentation."),
});

export const ApplicationRouteSchema = z.object({
    path: z.string().describe("The route path."),
    component: z.string().describe("The name of the component for the route."),
    methods: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])).default(["GET"]).describe("Allowed HTTP methods."),
    permissionsRequired: z.array(z.string()).optional().describe("Role-based access permissions for the route."),
    queryParams: z.record(z.string(), z.string()).optional().describe("Expected query parameters."),
    pathParams: z.record(z.string(), z.string()).optional().describe("Expected path parameters."),
    middlewares: z.array(z.string()).optional().describe("Middlewares applied to the route."),
});

export const ApplicationModelSchema = z.object({
    name: z.string().describe("The name of the model."),
    fields: z.record(z.string(), z.object({
        type: z.string().describe("The type of the field."),
        validationRules: z.string().optional().describe("Validation rules for the field."),
    })).describe("Fields and their types in the model."),
    relations: z
        .array(
            z.object({
                type: z.enum(["one-to-one", "one-to-many", "many-to-many"]).describe("Type of relationship."),
                relatedModel: z.string().describe("The related model name."),
            })
        )
        .optional()
        .describe("Relationships with other models."),
});

export const ApplicationServiceSchema = z.object({
    name: z.string().describe("The name of the service."),
    endpoint: z.string().optional().describe("The endpoint the service interacts with."),
    methods: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])).default([]).describe("HTTP methods supported by the service."),
    timeout: z.number().optional().describe("Timeout for the service in milliseconds."),
    retryPolicy: z.object({
        retries: z.number().default(3).describe("Number of retries allowed."),
        delay: z.number().default(1000).describe("Delay between retries in milliseconds."),
    }).optional(),
});

export const ApplicationSchemaSchema = z.object({
    name: z.string().describe("The name of the schema."),
    definition: z.record(z.string(), z.object({
        type: z.string().describe("The data type of the field (e.g., string, number, object)."),
        required: z.boolean().default(true).describe("Indicates if the field is required."),
        defaultValue: z.any().optional().describe("Default value for the field."),
        description: z.string().optional().describe("A brief description of the field."),
        validations: z.object({
            minLength: z.number().optional().describe("Minimum length for string fields."),
            maxLength: z.number().optional().describe("Maximum length for string fields."),
            min: z.number().optional().describe("Minimum value for numeric fields."),
            max: z.number().optional().describe("Maximum value for numeric fields."),
            regex: z.string().optional().describe("Regular expression for validating the field."),
        }).optional().describe("Validation rules for the field."),
        relationships: z.object({
            type: z.enum(["one-to-one", "one-to-many", "many-to-many"]).describe("Type of relationship."),
            relatedSchema: z.string().describe("The name of the related schema."),
        }).optional().describe("Defines relationships with other schemas."),
    })).describe("The definition of the schema fields."),
    description: z.string().optional().describe("A brief description of what the schema represents."),
    version: z.string().default("1.0.0").describe("The version of the schema."),
    examples: z.array(
        z.record(z.string(), z.any())
    ).optional().describe("Example instances of the schema."),
    createdAt: z.date().optional().describe("Timestamp of when the schema was created."),
    updatedAt: z.date().optional().describe("Timestamp of the last update to the schema."),
});

export const ApplicationMiddlewareSchema = z.object({
    name: z.string().describe("The name of the middleware."),
    description: z.string().optional().describe("A brief description of what the middleware does."),
    order: z.number().optional().describe("The execution order of the middleware."),
    dependencies: z.array(z.string()).optional().describe("Dependencies required for this middleware."),
});

export const ApplicationPluginSchema = z.object({
    name: z.string().describe("The name of the plugin."),
    version: z.string().default("1.0.0").describe("The version of the plugin."),
    author: z.string().optional().describe("The author of the plugin."),
    license: z.string().optional().describe("The plugin's license."),
    configuration: z.record(z.string(), z.any()).optional().describe("Plugin-specific configuration options."),
});

export const ApplicationTestSchema = z.object({
    name: z.string().describe("The name of the test."),
    type: z.enum(["unit", "integration", "e2e"]).describe("The type of the test."),
    status: z.enum(["passed", "failed", "skipped"]).optional().describe("The current status of the test."),
    lastRun: z.date().optional().describe("The timestamp of the last test run."),
    linkedComponents: z.array(z.string()).optional().describe("Components associated with this test."),
});

export const ApplicationBuildSystemSchema = z.object({
    tool: z.string().describe("The build tool used (e.g., Webpack, Rollup)."),
    configuration: z.record(z.string(), z.any()).optional().describe("Build tool configuration options."),
    buildScripts: z.array(z.string()).optional().describe("Scripts used during the build process."),
    outputPaths: z.record(z.string(), z.string()).optional().describe("Output paths for build artifacts."),
});

export const ApplicationDependencySchema = z.object({
    name: z.string().describe("The name of the dependency."),
    version: z.string().describe("The version of the dependency."),
    type: z.enum(["runtime", "development", "peer"]).describe("The type of dependency."),
});

export const ApplicationErrorHandlerSchema = z.object({
    type: z.enum(["global", "component", "service"]).describe("The type of error handler."),
    description: z.string().optional().describe("Details about the error-handling logic."),
    retryPolicy: z.object({
        retries: z.number().default(3).describe("Number of retries allowed."),
        delay: z.number().default(1000).describe("Delay between retries in milliseconds."),
    }).optional(),
    logLevel: z.enum(["info", "warn", "error"]).default("error").describe("Logging level for errors."),
});

export const ApplicationAuthenticationSchema = z.object({
    strategies: z.array(
        z.object({
            type: z.enum(["OAuth", "JWT", "BasicAuth", "Session"]).describe("The authentication strategy."),
            config: z.record(z.string(), z.any()).optional().describe("Configuration details specific to the strategy."),
        })
    ).default([]).describe("Authentication strategies."),
    isEnabled: z.boolean().default(true).describe("Indicates if authentication is enabled."),
    defaultStrategy: z.enum(["OAuth", "JWT", "BasicAuth", "Session"]).optional().describe("The default authentication strategy."),
    sessionTimeout: z.number().optional().describe("Session timeout duration in seconds."),
});

export const ApplicationAuthorizationSchema = z.object({
    roles: z.array(
        z.object({
            name: z.string().describe("The name of the role."),
            permissions: z.array(z.string()).default([]).describe("Permissions associated with the role."),
            defaultRole: z.boolean().default(false).describe("Whether this is the default role."),
        })
    ).default([]).describe("Roles and their permissions."),
    inheritance: z.record(z.string(), z.array(z.string())).optional().describe("Inheritance between roles."),
});

export const ApplicationDocumentationSchema = z.object({
    format: z.enum(["Markdown", "HTML", "JSON"]).optional().describe("The format of the documentation."),
    location: z.string().describe("The location of the documentation files."),
    version: z.string().optional().describe("The version of the documentation."),
    generatedAt: z.date().optional().describe("Timestamp of when the documentation was generated."),
});

export const ApplicationHookSchema = z.object({
    name: z.string().describe("The name of the hook."),
    trigger: z.string().describe("The event or lifecycle stage that triggers the hook."),
    description: z.string().optional().describe("Details about the hook."),
    priority: z.number().optional().describe("The execution priority of the hook."),
    errorHandlingPolicy: z.string().optional().describe("Policy for handling errors that occur during hook execution."),
});

export const ApplicationStateManagementSchema = z.object({
    library: z.string().describe("The library used for state management (e.g., Redux, MobX, Zustand)."),
    stateStructure: z.record(z.string(), z.any()).optional().describe("The structure of the global state."),
    statePersistence: z.boolean().default(false).describe("Indicates if the state is persistent."),
    synchronizationSettings: z.object({
        isEnabled: z.boolean().default(false).describe("Whether state synchronization across clients is enabled."),
        strategy: z.enum(["polling", "websockets"]).optional().describe("The synchronization strategy."),
        interval: z.number().optional().describe("Polling interval in milliseconds if polling is used."),
    }).optional().describe("Settings for synchronizing the state in distributed systems."),
});

export const ApplicationInternationalizationSchema = z.object({
    defaultLanguage: z.string().default("en").describe("The default language of the application."),
    supportedLanguages: z.array(z.object({
        code: z.string().min(2).describe("Language code (e.g., en-US)."),
        name: z.string().optional().describe("Readable language name."),
    })).default([{ code: "en" }]).describe("The list of supported languages."),
    fallbackLanguage: z.string().optional().describe("The language to fall back to when a translation is unavailable."),
    translationResources: z.record(z.string(), z.string()).optional().describe("Map of language codes to translation resource files or URLs."),
});

export const ApplicationStaticAssetsSchema = z.object({
    images: z.array(z.object({
        path: z.string().describe("Path to the image asset."),
        size: z.number().optional().describe("Size of the image file in bytes."),
        lastModified: z.date().optional().describe("Last modified date of the image."),
        cachePolicy: z.string().optional().describe("Cache policy for the image."),
    })).default([]).describe("List of image assets."),
    stylesheets: z.array(z.object({
        path: z.string().describe("Path to the stylesheet asset."),
        size: z.number().optional().describe("Size of the stylesheet file in bytes."),
        lastModified: z.date().optional().describe("Last modified date of the stylesheet."),
        cachePolicy: z.string().optional().describe("Cache policy for the stylesheet."),
    })).default([]).describe("List of stylesheet assets."),
    scripts: z.array(z.object({
        path: z.string().describe("Path to the script asset."),
        size: z.number().optional().describe("Size of the script file in bytes."),
        lastModified: z.date().optional().describe("Last modified date of the script."),
        cachePolicy: z.string().optional().describe("Cache policy for the script."),
    })).default([]).describe("List of script assets."),
});

export const ApplicationTransformerSchema = z.object({
    name: z.string().describe("The name of the transformer."),
    inputType: z.string().describe("The type of input the transformer expects."),
    outputType: z.string().describe("The type of output the transformer produces."),
    description: z.string().optional().describe("A brief description of the transformer."),
    transformationLogic: z.string().optional().describe("Details about the logic or method used for transformation."),
    exampleInput: z.string().optional().describe("An example input for the transformer."),
    exampleOutput: z.string().optional().describe("An example output produced by the transformer."),
    version: z.string().default("1.0.0").describe("The version of the transformer."),
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
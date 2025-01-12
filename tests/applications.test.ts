import { describe, it, expect } from "vitest";
import {
    ApplicationSchema,
    ApplicationMetadataSchema,
    ApplicationConfigurationSchema,
    ApplicationComponentSchema,
    ApplicationRouteSchema,
    ApplicationModelSchema,
    ApplicationServiceSchema,
    ApplicationSchemaSchema,
    ApplicationMiddlewareSchema,
    ApplicationPluginSchema,
    ApplicationTestSchema,
    ApplicationBuildSystemSchema,
    ApplicationDependencySchema,
    ApplicationErrorHandlerSchema,
    ApplicationAuthenticationSchema,
    ApplicationAuthorizationSchema,
    ApplicationDocumentationSchema,
    ApplicationHookSchema,
    ApplicationStateManagementSchema,
    ApplicationInternationalizationSchema,
    ApplicationStaticAssetsSchema,
    ApplicationTransformerSchema
} from "../src/applications";

// ---------------------
// ApplicationMetadataSchema
// ---------------------
describe("ApplicationMetadataSchema", () => {
    it("should validate a complete metadata object", () => {
        const metadata = {
            isPublished: true,
            publishedBy: "Jane Admin",
            platform: "web",
            releaseDate: new Date(),
            supportedLanguages: [
                { code: "en", name: "English" },
                { code: "fr", name: "French" },
            ],
            license: "MIT",
            developer: {
                name: "John Doe",
                contact: "john.doe@example.com",
            },
            category: "utility",
            ratings: [
                {
                    userId: "123e4567-e89b-12d3-a456-426614174001",
                    score: 4,
                    comment: "Very useful!",
                },
            ],
            averageRating: 4,
        };

        expect(() => ApplicationMetadataSchema.parse(metadata)).not.toThrow();
    });

    it("should validate minimal metadata object with defaults", () => {
        const metadata = {
            platform: "mobile",
        };

        const parsed = ApplicationMetadataSchema.parse(metadata);
        expect(parsed.isPublished).toBe(false); // default
        // supportedLanguages defaults to [{ code: "en" }]
        expect(parsed.supportedLanguages).toEqual([{ code: "en" }]);
    });

    it("should throw an error for invalid ratings", () => {
        const invalidMetadata = {
            platform: "web",
            ratings: [
                {
                    userId: "invalid-uuid", // not a valid UUID
                    score: 6, // out of allowed 1-5 range
                },
            ],
        };

        expect(() => ApplicationMetadataSchema.parse(invalidMetadata)).toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // 'platform' is required
        const invalidMetadata = {
            isPublished: true,
        };

        expect(() => ApplicationMetadataSchema.parse(invalidMetadata)).toThrow();
    });
});

// ---------------------
// ApplicationConfigurationSchema
// ---------------------
describe("ApplicationConfigurationSchema", () => {
    it("should validate a complete configuration object", () => {
        const configuration = {
            environment: "production",
            debugMode: true,
            apiEndpoints: {
                getUser: {
                    url: "/api/user",
                    requiresAuth: true,
                },
            },
            featureFlags: {
                darkMode: {
                    isEnabled: true,
                    description: "Toggle dark theme",
                },
            },
        };

        expect(() => ApplicationConfigurationSchema.parse(configuration)).not.toThrow();
    });

    it("should validate minimal configuration with defaults", () => {
        const configuration = {
            environment: "development",
        };

        const parsed = ApplicationConfigurationSchema.parse(configuration);
        expect(parsed.debugMode).toBe(false);
        // featureFlags defaults to an empty record {}
        expect(parsed.featureFlags).toEqual({});
    });

    it("should throw an error for invalid environment value", () => {
        const invalidConfiguration = {
            environment: "invalid-env",
        };

        expect(() => ApplicationConfigurationSchema.parse(invalidConfiguration)).toThrow();
    });
});

// ---------------------
// ApplicationComponentSchema
// ---------------------
describe("ApplicationComponentSchema", () => {
    it("should validate a valid component", () => {
        const component = {
            name: "Header",
            version: "1.2.3",
            status: "active",
        };

        expect(() => ApplicationComponentSchema.parse(component)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing version and status
        const invalidComponent = {
            name: "Header",
        };

        expect(() => ApplicationComponentSchema.parse(invalidComponent)).toThrow();
    });
});

// ---------------------
// ApplicationRouteSchema
// ---------------------
describe("ApplicationRouteSchema", () => {
    it("should validate a valid route", () => {
        const route = {
            path: "/home",
            component: "HomeComponent",
        };

        expect(() => ApplicationRouteSchema.parse(route)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'component'
        const invalidRoute = {
            path: "/home",
        };

        expect(() => ApplicationRouteSchema.parse(invalidRoute)).toThrow();
    });
});

// ---------------------
// ApplicationModelSchema
// ---------------------
describe("ApplicationModelSchema", () => {
    it("should validate a valid model", () => {
        const model = {
            name: "User",
            fields: {
                id: { type: "string" },
                name: { type: "string" },
            },
        };

        expect(() => ApplicationModelSchema.parse(model)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'fields'
        const invalidModel = {
            name: "User",
        };

        expect(() => ApplicationModelSchema.parse(invalidModel)).toThrow();
    });
});

// ---------------------
// ApplicationServiceSchema
// ---------------------
describe("ApplicationServiceSchema", () => {
    it("should validate a valid service", () => {
        const service = {
            name: "AuthService",
            endpoint: "/api/auth",
            methods: ["POST"],
            timeout: 3000,
            retryPolicy: {
                retries: 5,
                delay: 1000,
            },
        };

        expect(() => ApplicationServiceSchema.parse(service)).not.toThrow();
    });

    it("should validate a service with default methods", () => {
        const service = {
            name: "AuthService",
        };

        const parsed = ApplicationServiceSchema.parse(service);
        expect(parsed.methods).toEqual([]);
    });

    it("should throw an error for invalid methods", () => {
        const invalidService = {
            name: "AuthService",
            methods: ["INVALID_METHOD"],
        };

        expect(() => ApplicationServiceSchema.parse(invalidService)).toThrow();
    });
});

// ---------------------
// ApplicationSchemaSchema
// ---------------------
describe("ApplicationSchemaSchema", () => {
    it("should validate a valid schema", () => {
        const schema = {
            name: "UserSchema",
            definition: {
                id: {
                    type: "string",
                },
                name: {
                    type: "string",
                    description: "User's full name",
                },
            },
        };

        expect(() => ApplicationSchemaSchema.parse(schema)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'definition'
        const invalidSchema = {
            name: "UserSchema",
        };

        expect(() => ApplicationSchemaSchema.parse(invalidSchema)).toThrow();
    });
});

// ---------------------
// ApplicationMiddlewareSchema
// ---------------------
describe("ApplicationMiddlewareSchema", () => {
    it("should validate a valid middleware", () => {
        const middleware = {
            name: "AuthMiddleware",
            description: "Ensures user is authenticated.",
            order: 1,
            dependencies: ["cookieParser", "sessionManager"],
        };

        expect(() => ApplicationMiddlewareSchema.parse(middleware)).not.toThrow();
    });

    it("should validate middleware without optional description", () => {
        const middleware = {
            name: "AuthMiddleware",
        };

        expect(() => ApplicationMiddlewareSchema.parse(middleware)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'name'
        const invalidMiddleware = {
            description: "Ensures user is authenticated.",
        };

        expect(() => ApplicationMiddlewareSchema.parse(invalidMiddleware)).toThrow();
    });
});

// ---------------------
// ApplicationPluginSchema
// ---------------------
describe("ApplicationPluginSchema", () => {
    it("should validate a valid plugin", () => {
        const plugin = {
            name: "AnalyticsPlugin",
            version: "1.0.0",
            author: "Acme Inc",
            configuration: {
                enabled: true,
            },
        };

        expect(() => ApplicationPluginSchema.parse(plugin)).not.toThrow();
    });

    it("should validate a plugin with default version", () => {
        const plugin = {
            name: "AnalyticsPlugin",
        };

        const parsed = ApplicationPluginSchema.parse(plugin);
        expect(parsed.version).toBe("1.0.0");
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'name'
        const invalidPlugin = {
            version: "1.0.0",
        };

        expect(() => ApplicationPluginSchema.parse(invalidPlugin)).toThrow();
    });
});

// ---------------------
// ApplicationTestSchema
// ---------------------
describe("ApplicationTestSchema", () => {
    it("should validate a valid test", () => {
        const test = {
            name: "User service test",
            type: "unit",
            status: "passed",
            lastRun: new Date(),
        };

        expect(() => ApplicationTestSchema.parse(test)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'name'
        const invalidTest = {
            type: "unit",
        };

        expect(() => ApplicationTestSchema.parse(invalidTest)).toThrow();
    });
});

// ---------------------
// ApplicationBuildSystemSchema
// ---------------------
describe("ApplicationBuildSystemSchema", () => {
    it("should validate a valid build system configuration", () => {
        const buildSystem = {
            tool: "Webpack",
            configuration: {
                mode: "production",
            },
            buildScripts: ["npm run build"],
            outputPaths: {
                dist: "./dist",
            },
        };

        expect(() => ApplicationBuildSystemSchema.parse(buildSystem)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'tool'
        const invalidBuildSystem = {};

        expect(() => ApplicationBuildSystemSchema.parse(invalidBuildSystem)).toThrow();
    });
});

// ---------------------
// ApplicationDependencySchema
// ---------------------
describe("ApplicationDependencySchema", () => {
    it("should validate a valid dependency", () => {
        const dependency = {
            name: "lodash",
            version: "4.17.21",
            type: "runtime",
        };

        expect(() => ApplicationDependencySchema.parse(dependency)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'version' and 'type'
        const invalidDependency = {
            name: "lodash",
        };

        expect(() => ApplicationDependencySchema.parse(invalidDependency)).toThrow();
    });
});

// ---------------------
// ApplicationErrorHandlerSchema
// ---------------------
describe("ApplicationErrorHandlerSchema", () => {
    it("should validate a valid error handler", () => {
        const errorHandler = {
            type: "global",
            description: "Handles all uncaught exceptions.",
            retryPolicy: {
                retries: 5,
                delay: 2000,
            },
            logLevel: "warn",
        };

        expect(() => ApplicationErrorHandlerSchema.parse(errorHandler)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'type'
        const invalidErrorHandler = {
            description: "Handles all uncaught exceptions.",
        };

        expect(() => ApplicationErrorHandlerSchema.parse(invalidErrorHandler)).toThrow();
    });
});

// ---------------------
// ApplicationAuthenticationSchema
// ---------------------
describe("ApplicationAuthenticationSchema", () => {
    it("should validate a valid authentication configuration", () => {
        const authentication = {
            strategies: [
                { type: "OAuth" },
                { type: "JWT", config: { secret: "abcd1234" } },
            ],
            isEnabled: true,
        };

        expect(() => ApplicationAuthenticationSchema.parse(authentication)).not.toThrow();
    });

    it("should validate an authentication configuration with defaults", () => {
        const authentication = {
            strategies: [
                { type: "BasicAuth" },
            ],
        };

        const parsed = ApplicationAuthenticationSchema.parse(authentication);
        expect(parsed.isEnabled).toBe(true);
        // defaultStrategy is optional, so it's undefined if not provided
        expect(parsed.defaultStrategy).toBeUndefined();
    });

    it("should throw an error for invalid strategies", () => {
        // 'type' is an enum, so 'InvalidStrategy' will fail
        const invalidAuthentication = {
            strategies: [
                { type: "InvalidStrategy" },
            ],
        };

        expect(() => ApplicationAuthenticationSchema.parse(invalidAuthentication)).toThrow();
    });
});

// ---------------------
// ApplicationAuthorizationSchema
// ---------------------
describe("ApplicationAuthorizationSchema", () => {
    it("should validate a valid authorization configuration", () => {
        const authorization = {
            roles: [
                {
                    name: "admin",
                    permissions: ["read", "write", "delete"],
                    defaultRole: false,
                },
            ],
            inheritance: {
                admin: ["user"],
            },
        };

        expect(() => ApplicationAuthorizationSchema.parse(authorization)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'name' in the role object
        const invalidAuthorization = {
            roles: [
                {
                    permissions: ["read", "write"],
                },
            ],
        };

        expect(() => ApplicationAuthorizationSchema.parse(invalidAuthorization)).toThrow();
    });
});

// ---------------------
// ApplicationDocumentationSchema
// ---------------------
describe("ApplicationDocumentationSchema", () => {
    it("should validate a valid documentation configuration", () => {
        const documentation = {
            format: "Markdown",
            location: "/docs/api.md",
            version: "1.2.3",
            generatedAt: new Date(),
        };

        expect(() => ApplicationDocumentationSchema.parse(documentation)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'location'
        const invalidDocumentation = {
            format: "HTML",
        };

        expect(() => ApplicationDocumentationSchema.parse(invalidDocumentation)).toThrow();
    });
});

// ---------------------
// ApplicationHookSchema
// ---------------------
describe("ApplicationHookSchema", () => {
    it("should validate a valid hook", () => {
        const hook = {
            name: "useAuth",
            trigger: "componentDidMount",
            description: "Checks if the user is authenticated.",
            priority: 10,
            errorHandlingPolicy: "log-only",
        };

        expect(() => ApplicationHookSchema.parse(hook)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'name'
        const invalidHook = {
            trigger: "componentDidMount",
        };

        expect(() => ApplicationHookSchema.parse(invalidHook)).toThrow();
    });
});

// ---------------------
// ApplicationStateManagementSchema
// ---------------------
describe("ApplicationStateManagementSchema", () => {
    it("should validate a valid state management configuration", () => {
        const stateManagement = {
            library: "Redux",
            stateStructure: {
                user: {
                    id: "string",
                    name: "string",
                },
            },
            statePersistence: true,
            synchronizationSettings: {
                isEnabled: true,
                strategy: "websockets",
            },
        };

        expect(() => ApplicationStateManagementSchema.parse(stateManagement)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'library'
        const invalidStateManagement = {
            stateStructure: {
                user: {
                    id: "string",
                },
            },
        };

        expect(() => ApplicationStateManagementSchema.parse(invalidStateManagement)).toThrow();
    });
});

// ---------------------
// ApplicationInternationalizationSchema
// ---------------------
describe("ApplicationInternationalizationSchema", () => {
    it("should validate a valid internationalization configuration", () => {
        const i18n = {
            defaultLanguage: "en",
            supportedLanguages: [
                { code: "en", name: "English" },
                { code: "fr", name: "French" },
                { code: "es", name: "Spanish" },
            ],
            fallbackLanguage: "en",
            translationResources: {
                en: "/i18n/en.json",
                fr: "/i18n/fr.json",
            },
        };

        expect(() => ApplicationInternationalizationSchema.parse(i18n)).not.toThrow();
    });

    it("should validate internationalization with defaults", () => {
        // If only 'supportedLanguages' is missing, it defaults to [{ code: "en" }]
        // If only 'defaultLanguage' is missing, it defaults to "en"
        const i18n = {};

        const parsed = ApplicationInternationalizationSchema.parse(i18n);
        expect(parsed.defaultLanguage).toBe("en");
        expect(parsed.supportedLanguages).toEqual([{ code: "en" }]);
    });

    it("should throw an error for invalid configuration", () => {
        // If 'supportedLanguages' is not an array or includes invalid objects
        const invalidI18n = {
            defaultLanguage: "xx",
            supportedLanguages: [
                { code: "" }, // empty code
            ]
        };

        expect(() => ApplicationInternationalizationSchema.parse(invalidI18n)).toThrow();
    });
});

// ---------------------
// ApplicationStaticAssetsSchema
// ---------------------
describe("ApplicationStaticAssetsSchema", () => {
    it("should validate a valid static assets configuration", () => {
        const staticAssets = {
            images: [
                {
                    path: "/images/logo.png",
                    size: 12345,
                },
            ],
            stylesheets: [
                {
                    path: "/styles/main.css",
                },
            ],
            scripts: [
                {
                    path: "/scripts/main.js",
                    cachePolicy: "no-cache",
                },
            ],
        };

        expect(() => ApplicationStaticAssetsSchema.parse(staticAssets)).not.toThrow();
    });

    it("should validate static assets with defaults", () => {
        const staticAssets = {};

        const parsed = ApplicationStaticAssetsSchema.parse(staticAssets);
        expect(parsed.images).toEqual([]);
        expect(parsed.stylesheets).toEqual([]);
        expect(parsed.scripts).toEqual([]);
    });

    it("should throw an error for invalid values", () => {
        // 'images' must be an array of objects, not a single string
        const invalidStaticAssets = {
            images: "/images/logo.png",
        };

        expect(() => ApplicationStaticAssetsSchema.parse(invalidStaticAssets)).toThrow();
    });
});

// ---------------------
// ApplicationTransformerSchema
// ---------------------
describe("ApplicationTransformerSchema", () => {
    it("should validate a valid transformer", () => {
        const transformer = {
            name: "JsonToXmlTransformer",
            inputType: "JSON",
            outputType: "XML",
            description: "Transforms JSON data into XML format.",
            transformationLogic: "Use xml-js library for conversion.",
            exampleInput: '{"foo":"bar"}',
            exampleOutput: "<foo>bar</foo>",
            version: "2.0.0",
        };

        expect(() => ApplicationTransformerSchema.parse(transformer)).not.toThrow();
    });

    it("should validate a minimal transformer", () => {
        const transformer = {
            name: "CsvToJsonTransformer",
            inputType: "CSV",
            outputType: "JSON",
        };

        const parsed = ApplicationTransformerSchema.parse(transformer);
        expect(parsed.name).toBe("CsvToJsonTransformer");
        expect(parsed.inputType).toBe("CSV");
        expect(parsed.outputType).toBe("JSON");
        expect(parsed.description).toBeUndefined();
        expect(parsed.transformationLogic).toBeUndefined();
        expect(parsed.version).toBe("1.0.0"); // default
    });

    it("should throw an error for missing required fields", () => {
        // Missing 'inputType' and 'outputType'
        const invalidTransformer = {
            name: "InvalidTransformer",
        };

        expect(() => ApplicationTransformerSchema.parse(invalidTransformer)).toThrow();
    });
});

// ---------------------
// ApplicationSchema (the top-level application object)
// ---------------------
describe("ApplicationSchema", () => {
    it("should validate a complete application object", () => {
        const application = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            ownerId: "123e4567-e89b-12d3-a456-426614174001",
            metadata: {
                isPublished: true,
                platform: "web",
            },
            configurations: {
                environment: "production",
            },
        };

        expect(() => ApplicationSchema.parse(application)).not.toThrow();
    });

    it("should validate a minimal application object", () => {
        const application = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            ownerId: "123e4567-e89b-12d3-a456-426614174001",
        };

        expect(() => ApplicationSchema.parse(application)).not.toThrow();
    });

    it("should throw an error for invalid configurations", () => {
        // 'environment' must be one of 'development', 'staging', or 'production'
        const invalidApplication = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            createdAt: new Date(),
            ownerId: "123e4567-e89b-12d3-a456-426614174001",
            configurations: {
                environment: "invalid-env",
            },
        };

        expect(() => ApplicationSchema.parse(invalidApplication)).toThrow();
    });
});

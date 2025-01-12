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

describe("ApplicationMetadataSchema", () => {
    it("should validate a complete metadata object", () => {
        const metadata = {
            isPublished: true,
            platform: "web",
            releaseDate: new Date(),
            supportedLanguages: ["en", "fr"],
            license: "MIT",
            developer: "John Doe",
            category: "utility",
            ratings: [
                {
                    userId: "123e4567-e89b-12d3-a456-426614174001",
                    score: 4,
                    comment: "Very useful!",
                },
            ],
        };

        expect(() => ApplicationMetadataSchema.parse(metadata)).not.toThrow();
    });

    it("should validate minimal metadata object with defaults", () => {
        const metadata = {
            platform: "mobile",
        };

        const parsed = ApplicationMetadataSchema.parse(metadata);
        expect(parsed.isPublished).toBe(false);
        expect(parsed.supportedLanguages).toEqual(["en"]);
    });

    it("should throw an error for invalid ratings", () => {
        const invalidMetadata = {
            platform: "web",
            ratings: [
                {
                    userId: "invalid-uuid",
                    score: 6,
                },
            ],
        };

        expect(() => ApplicationMetadataSchema.parse(invalidMetadata)).toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidMetadata = {
            isPublished: true,
        };

        expect(() => ApplicationMetadataSchema.parse(invalidMetadata)).toThrow();
    });
});

describe("ApplicationConfigurationSchema", () => {
    it("should validate a complete configuration object", () => {
        const configuration = {
            environment: "production",
            debugMode: true,
            apiEndpoints: {
                getUser: "/api/user",
            },
            featureFlags: {
                darkMode: true,
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
        expect(parsed.featureFlags).toEqual({});
    });

    it("should throw an error for invalid environment value", () => {
        const invalidConfiguration = {
            environment: "invalid-env",
        };

        expect(() => ApplicationConfigurationSchema.parse(invalidConfiguration)).toThrow();
    });
});

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
        const invalidComponent = {
            name: "Header",
        };

        expect(() => ApplicationComponentSchema.parse(invalidComponent)).toThrow();
    });
});

describe("ApplicationRouteSchema", () => {
    it("should validate a valid route", () => {
        const route = {
            path: "/home",
            component: "HomeComponent",
        };

        expect(() => ApplicationRouteSchema.parse(route)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidRoute = {
            path: "/home",
        };

        expect(() => ApplicationRouteSchema.parse(invalidRoute)).toThrow();
    });
});

describe("ApplicationModelSchema", () => {
    it("should validate a valid model", () => {
        const model = {
            name: "User",
            fields: {
                id: "string",
                name: "string",
            },
        };

        expect(() => ApplicationModelSchema.parse(model)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidModel = {
            name: "User",
        };

        expect(() => ApplicationModelSchema.parse(invalidModel)).toThrow();
    });
});

describe("ApplicationServiceSchema", () => {
    it("should validate a valid service", () => {
        const service = {
            name: "AuthService",
            endpoint: "/api/auth",
            methods: ["POST"],
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

describe("ApplicationSchemaSchema", () => {
    it("should validate a valid schema", () => {
        const schema = {
            name: "UserSchema",
            definition: {
                id: { type: "string" },
                name: { type: "string" },
            },
        };

        expect(() => ApplicationSchemaSchema.parse(schema)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidSchema = {
            name: "UserSchema",
        };

        expect(() => ApplicationSchemaSchema.parse(invalidSchema)).toThrow();
    });
});

describe("ApplicationMiddlewareSchema", () => {
    it("should validate a valid middleware", () => {
        const middleware = {
            name: "AuthMiddleware",
            description: "Ensures user is authenticated.",
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
        const invalidMiddleware = {
            description: "Ensures user is authenticated.",
        };

        expect(() => ApplicationMiddlewareSchema.parse(invalidMiddleware)).toThrow();
    });
});

describe("ApplicationPluginSchema", () => {
    it("should validate a valid plugin", () => {
        const plugin = {
            name: "AnalyticsPlugin",
            version: "1.0.0",
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
        const invalidPlugin = {
            version: "1.0.0",
        };

        expect(() => ApplicationPluginSchema.parse(invalidPlugin)).toThrow();
    });
});

describe("ApplicationTestSchema", () => {
    it("should validate a valid test", () => {
        const test = {
            name: "User service test",
            type: "unit",
            status: "passed",
        };

        expect(() => ApplicationTestSchema.parse(test)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidTest = {
            type: "unit",
        };

        expect(() => ApplicationTestSchema.parse(invalidTest)).toThrow();
    });
});

describe("ApplicationBuildSystemSchema", () => {
    it("should validate a valid build system configuration", () => {
        const buildSystem = {
            tool: "Webpack",
            configuration: {
                mode: "production",
            },
        };

        expect(() => ApplicationBuildSystemSchema.parse(buildSystem)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidBuildSystem = {};

        expect(() => ApplicationBuildSystemSchema.parse(invalidBuildSystem)).toThrow();
    });
});

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
        const invalidDependency = {
            name: "lodash",
        };

        expect(() => ApplicationDependencySchema.parse(invalidDependency)).toThrow();
    });
});

describe("ApplicationErrorHandlerSchema", () => {
    it("should validate a valid error handler", () => {
        const errorHandler = {
            type: "global",
            description: "Handles all uncaught exceptions.",
        };

        expect(() => ApplicationErrorHandlerSchema.parse(errorHandler)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidErrorHandler = {
            description: "Handles all uncaught exceptions.",
        };

        expect(() => ApplicationErrorHandlerSchema.parse(invalidErrorHandler)).toThrow();
    });
});

describe("ApplicationAuthenticationSchema", () => {
    it("should validate a valid authentication configuration", () => {
        const authentication = {
            strategies: ["OAuth", "JWT"],
            isEnabled: true,
        };

        expect(() => ApplicationAuthenticationSchema.parse(authentication)).not.toThrow();
    });

    it("should validate an authentication configuration with defaults", () => {
        const authentication = {
            strategies: ["BasicAuth"],
        };

        const parsed = ApplicationAuthenticationSchema.parse(authentication);
        expect(parsed.isEnabled).toBe(true);
    });

    it("should throw an error for invalid strategies", () => {
        const invalidAuthentication = {
            strategies: ["InvalidStrategy"],
        };

        expect(() => ApplicationAuthenticationSchema.parse(invalidAuthentication)).toThrow();
    });
});

describe("ApplicationAuthorizationSchema", () => {
    it("should validate a valid authorization configuration", () => {
        const authorization = {
            roles: [
                {
                    name: "admin",
                    permissions: ["read", "write", "delete"],
                },
            ],
        };

        expect(() => ApplicationAuthorizationSchema.parse(authorization)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
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

describe("ApplicationDocumentationSchema", () => {
    it("should validate a valid documentation configuration", () => {
        const documentation = {
            format: "Markdown",
            location: "/docs/api.md",
        };

        expect(() => ApplicationDocumentationSchema.parse(documentation)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidDocumentation = {
            format: "HTML",
        };

        expect(() => ApplicationDocumentationSchema.parse(invalidDocumentation)).toThrow();
    });
});

describe("ApplicationHookSchema", () => {
    it("should validate a valid hook", () => {
        const hook = {
            name: "useAuth",
            trigger: "componentDidMount",
            description: "Checks if the user is authenticated.",
        };

        expect(() => ApplicationHookSchema.parse(hook)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
        const invalidHook = {
            trigger: "componentDidMount",
        };

        expect(() => ApplicationHookSchema.parse(invalidHook)).toThrow();
    });
});

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
        };

        expect(() => ApplicationStateManagementSchema.parse(stateManagement)).not.toThrow();
    });

    it("should throw an error for missing required fields", () => {
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

describe("ApplicationInternationalizationSchema", () => {
    it("should validate a valid internationalization configuration", () => {
        const i18n = {
            defaultLanguage: "en",
            supportedLanguages: ["en", "fr", "es"],
        };

        expect(() => ApplicationInternationalizationSchema.parse(i18n)).not.toThrow();
    });

    it("should validate internationalization with defaults", () => {
        const i18n = {
            supportedLanguages: ["en"],
        };

        const parsed = ApplicationInternationalizationSchema.parse(i18n);
        expect(parsed.defaultLanguage).toBe("en");
    });

    it("should throw an error for invalid configuration", () => {
        const invalidI18n = {
            defaultLanguage: "xx",
            supportedLanguages: null
        };

        expect(() => ApplicationInternationalizationSchema.parse(invalidI18n)).toThrow();
    });
});

describe("ApplicationStaticAssetsSchema", () => {
    it("should validate a valid static assets configuration", () => {
        const staticAssets = {
            images: ["/images/logo.png"],
            stylesheets: ["/styles/main.css"],
            scripts: ["/scripts/main.js"],
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
        const invalidStaticAssets = {
            images: "/images/logo.png", // Should be an array
        };

        expect(() => ApplicationStaticAssetsSchema.parse(invalidStaticAssets)).toThrow();
    });
});

describe("ApplicationTransformerSchema", () => {
    it("should validate a valid transformer", () => {
        const transformer = {
            name: "JsonToXmlTransformer",
            inputType: "JSON",
            outputType: "XML",
            description: "Transforms JSON data into XML format.",
            transformationLogic: "Use xml-js library for conversion.",
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
    });

    it("should throw an error for missing required fields", () => {
        const invalidTransformer = {
            name: "InvalidTransformer",
        };

        expect(() => ApplicationTransformerSchema.parse(invalidTransformer)).toThrow();
    });
});

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

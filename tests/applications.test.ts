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

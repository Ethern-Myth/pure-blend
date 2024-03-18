import {
	generateOpenAPIDoc,
	generateMarkdownDoc,
	generateHTMLDoc,
} from "../src";
import { Route } from "../src";

// Mock the escape function
jest.mock("html-escaper", () => ({
	escape: jest.fn((text) => text), // Mocking escape function to return the same text
}));

describe("Documentation Generation Functions", () => {
	const routes: Route[] = [
		{
			path: "/test",
			methods: ["GET", "POST"],
		},
		{
			path: "/user",
			methods: ["GET"],
		},
	];

	describe("generateOpenAPIDoc", () => {
		it("should generate OpenAPI documentation", () => {
			const title = "Test OpenAPI Documentation";
			const openAPIDoc = generateOpenAPIDoc(routes, title);

			expect(openAPIDoc).toHaveProperty("openapi", "3.0.0");
			expect(openAPIDoc.info).toHaveProperty("title", title);
			expect(openAPIDoc.info).toHaveProperty("version", "1.0.0");
			expect(openAPIDoc.info).toHaveProperty(
				"description",
				"Automatically generated API documentation for Express.js applications"
			);
			expect(openAPIDoc.paths).toHaveProperty("/test");
			expect(openAPIDoc.paths).toHaveProperty("/user");
			expect(openAPIDoc.paths["/test"]).toHaveProperty("get");
			expect(openAPIDoc.paths["/test"]).toHaveProperty("post");
			expect(openAPIDoc.paths["/user"]).toHaveProperty("get");
			expect(openAPIDoc.paths["/test"].get).toHaveProperty(
				"summary",
				"Endpoint GET /test"
			);
			expect(openAPIDoc.paths["/test"].get).toHaveProperty(
				"description",
				"Auto-generated description"
			);
		});
	});

	describe("generateMarkdownDoc", () => {
		it("should generate Markdown documentation", () => {
			const title = "Test Markdown Documentation";
			const markdownDoc = generateMarkdownDoc(routes, title);

			expect(markdownDoc).toContain(`# ${title}`);
			expect(markdownDoc).toContain("## /test");
			expect(markdownDoc).toContain("### GET");
			expect(markdownDoc).toContain("### POST");
			expect(markdownDoc).toContain("## /user");
			expect(markdownDoc).toContain("### GET");
		});
	});

	describe("generateHTMLDoc", () => {
		it("should generate HTML documentation", () => {
			const title = "Test HTML Documentation";
			const htmlDoc = generateHTMLDoc(routes, title);

			expect(htmlDoc).toContain(`<title>${title}</title>`);
			expect(htmlDoc).toContain("<h2>/test</h2>");
			expect(htmlDoc).toContain("<h3>GET</h3>");
			expect(htmlDoc).toContain("<h3>POST</h3>");
			expect(htmlDoc).toContain("<h2>/user</h2>");
			expect(htmlDoc).toContain("<h3>GET</h3>");
		});
	});
});

import express from "express";
import { generateAPIDocs } from "../src"; // replace with your actual file name
import { parseRoutes } from "../src";
import {
	generateOpenAPIDoc,
	generateMarkdownDoc,
	generateHTMLDoc,
} from "../src";

jest.mock("../src/lib/parser");
jest.mock("../src/lib/generator");

describe("generateAPIDocs", () => {
	let app = express();

	beforeEach(() => {
		app = express();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should generate OpenAPI documentation", () => {
		const routes = [{ path: "/", methods: ["GET"] }];
		const expectedTitle = "Test API";
		(parseRoutes as jest.Mock).mockReturnValue(routes);
		const expectedOpenAPIDoc = {
			/* mock your expected OpenAPI doc */
		};
		(generateOpenAPIDoc as jest.Mock).mockReturnValue(expectedOpenAPIDoc);

		const result = generateAPIDocs(app, "openapi", expectedTitle);

		expect(parseRoutes).toHaveBeenCalledWith(app);
		expect(generateOpenAPIDoc).toHaveBeenCalledWith(routes, expectedTitle);
		expect(result).toEqual(expectedOpenAPIDoc);
	});

	test("should generate Markdown documentation", () => {
		const routes = [{ path: "/", methods: ["GET"] }];
		const expectedTitle = "Test API";
		(parseRoutes as jest.Mock).mockReturnValue(routes);
		const expectedMarkdownDoc = "mock markdown documentation";
		(generateMarkdownDoc as jest.Mock).mockReturnValue(expectedMarkdownDoc);

		const result = generateAPIDocs(app, "markdown", expectedTitle);

		expect(parseRoutes).toHaveBeenCalledWith(app);
		expect(generateMarkdownDoc).toHaveBeenCalledWith(routes, expectedTitle);
		expect(result).toEqual(expectedMarkdownDoc);
	});

	test("should generate HTML documentation", () => {
		const routes = [{ path: "/", methods: ["GET"] }];
		const expectedTitle = "Test API";
		(parseRoutes as jest.Mock).mockReturnValue(routes);
		const expectedHtmlDoc = "mock HTML documentation";
		(generateHTMLDoc as jest.Mock).mockReturnValue(expectedHtmlDoc);

		const result = generateAPIDocs(app, "html", expectedTitle);

		expect(parseRoutes).toHaveBeenCalledWith(app);
		expect(generateHTMLDoc).toHaveBeenCalledWith(routes, expectedTitle);
		expect(result).toEqual(expectedHtmlDoc);
	});
});

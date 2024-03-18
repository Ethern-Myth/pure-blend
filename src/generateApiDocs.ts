import express from "express";
import { parseRoutes } from "./lib/parser";
import {
	generateOpenAPIDoc,
	generateMarkdownDoc,
	generateHTMLDoc,
} from "./lib/generator";

function generateAPIDocs(
	app: express.Application,
	format: "openapi" | "markdown" | "html" = "openapi",
	title: string = "Express API Documentation"
): string | object {
	const routes = parseRoutes(app);
	switch (format) {
		case "openapi":
			return generateOpenAPIDoc(routes, title);
		case "markdown":
			return generateMarkdownDoc(routes, title);
		case "html":
			return generateHTMLDoc(routes, title);
		default:
			throw new Error("Invalid format specified");
	}
}

export { generateAPIDocs };

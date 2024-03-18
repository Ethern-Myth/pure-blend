import { escape } from "html-escaper";
import { Route } from "../interfaces";

export interface OpenAPIDoc {
	openapi: string;
	info: {
		title: string;
		version: string;
		description: string;
	};
	paths: Record<string, Record<string, OpenAPIPathItem>>;
}

export interface OpenAPIPathItem {
	summary: string;
	description: string;
	responses: Record<string, { description: string }>;
}

function generateOpenAPIDoc(
	routes: Route[],
	title: string = "Express API Documentation"
): OpenAPIDoc {
	const openAPIDoc: OpenAPIDoc = {
		openapi: "3.0.0",
		info: {
			title: title,
			version: "1.0.0",
			description:
				"Automatically generated API documentation for Express.js applications",
		},
		paths: {},
	};

	routes.forEach((route) => {
		const { path, methods } = route;
		openAPIDoc.paths[path] = {};
		methods.forEach((method) => {
			openAPIDoc.paths[path][method.toLowerCase()] = {
				summary: `Endpoint ${method} ${path}`,
				description: "Auto-generated description",
				responses: {
					"200": {
						description: "Success",
					},
				},
			};
		});
	});

	return openAPIDoc;
}

function generateMarkdownDoc(
	routes: Route[],
	title: string = "Express API Documentation"
): string {
	let markdownDoc = `# ${title}\n\n`;

	routes.forEach((route) => {
		const { path, methods } = route;
		markdownDoc += `## ${path}\n\n`;
		methods.forEach((method) => {
			markdownDoc += `### ${escape(method)}\n\n`;
			markdownDoc += "Auto-generated description\n\n";
		});
	});

	return markdownDoc;
}

function generateHTMLDoc(
	routes: Route[],
	title: string = "Express API Documentation"
): string {
	let htmlDoc = `<html><head><title>${title}</title></head><body>`;

	routes.forEach((route) => {
		const { path, methods } = route;
		htmlDoc += `<h2>${escape(path)}</h2>`;
		methods.forEach((method) => {
			htmlDoc += `<h3>${escape(method)}</h3>`;
			htmlDoc += "<p>Auto-generated description</p>";
		});
	});

	htmlDoc += "</body></html>";

	return htmlDoc;
}
export { generateOpenAPIDoc, generateMarkdownDoc, generateHTMLDoc };

import express from "express";
import { Route } from "../interfaces";

function parseRoutes(app: express.Application, basePath: string = ""): Route[] {
	const routes: Route[] = [];
	app._router.stack.forEach((middleware: any) => {
		if (middleware.route) {
			const { path, methods } = middleware.route;
			routes.push({ path: basePath + path, methods: Object.keys(methods) });
		} else if (middleware.name === "router" && middleware.handle.stack) {
			middleware.handle.stack.forEach((handler: any) => {
				const { route } = handler;
				if (route) {
					const { path, methods } = route;
					routes.push({ path: basePath + path, methods: Object.keys(methods) });
				}
			});
		}
	});
	return routes;
}

export { parseRoutes };

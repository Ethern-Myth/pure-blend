import express from "express";
import { parseRoutes } from "../src"; // Update with your module file path
import { Route } from "../src";

describe("parseRoutes", () => {
	it("should return an array of routes", () => {
		const app = express();

		app.get("/test", (req, res) => {
			res.send("Test route");
		});

		app.post("/test2", (req, res) => {
			res.send("Test route 2");
		});

		const routes: Route[] = parseRoutes(app);

		expect(routes).toHaveLength(2);
		expect(routes[0].path).toBe("/test");
		expect(routes[0].methods).toEqual(["get"]);
		expect(routes[1].path).toBe("/test2");
		expect(routes[1].methods).toEqual(["post"]);
	});

	it("should handle nested routers", () => {
		const app = express();
		const router = express.Router();

		router.get("/nested", (req, res) => {
			res.send("Nested route");
		});

		app.use("/api", router);

		const routes: Route[] = parseRoutes(app, "/api"); // Pass the base path '/api'

		expect(routes).toHaveLength(1);
		expect(routes[0].path).toBe("/api/nested");
		expect(routes[0].methods).toEqual(["get"]);
	});
});

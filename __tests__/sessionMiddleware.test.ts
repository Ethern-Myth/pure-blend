import { Request, Response, NextFunction } from "express";
import { sessionMiddleware } from "../src";

describe("sessionMiddleware", () => {
	it("should set session data on the request object", () => {
		// Mock session data
		const sessionData = { userId: 123, username: "testuser" };

		// Mock request, response, and nextFunction
		const req = {} as any;
		const res = {} as Response;
		const next = jest.fn() as NextFunction;

		// Call the middleware
		const middleware = sessionMiddleware(sessionData);
		middleware(req, res, next);

		// Expectations
		expect(req.session).toEqual(sessionData);
		expect(next).toHaveBeenCalled();
	});
});

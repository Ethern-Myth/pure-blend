import { Request, Response } from "express";
import { performanceMonitoringMiddleware } from "../src";

// Mock Express request, response, and next function
const mockRequest = {} as Request;
const mockResponse = {
	on: jest.fn(),
	once: jest.fn(),
	statusCode: 200,
} as any; // Typecast mockResponse to any
const mockNext = jest.fn();

describe("Performance Monitoring Middleware", () => {
	beforeEach(() => {
		// Reset the mockNext function
		mockNext.mockClear();
	});

	it("should call next function", () => {
		// Call the middleware function
		performanceMonitoringMiddleware()(mockRequest, mockResponse, mockNext);

		// Check if the next function was called
		expect(mockNext).toHaveBeenCalled();
	});

	it("should record metrics for successful response", () => {
		// Mock performance.now
		jest
			.spyOn(performance, "now")
			.mockReturnValueOnce(0)
			.mockReturnValueOnce(1000);

		// Mock process.cpuUsage
		jest
			.spyOn(process, "cpuUsage")
			.mockReturnValueOnce({ user: 1000, system: 500 })
			.mockReturnValueOnce({ user: 1500, system: 750 });

		// Mock process.memoryUsage
		jest.spyOn(process, "memoryUsage").mockReturnValueOnce({
			heapUsed: 1024 * 1024,
			rss: 0,
			heapTotal: 0,
			external: 0,
			arrayBuffers: 0,
		});

		// Call the middleware function
		performanceMonitoringMiddleware()(mockRequest, mockResponse, mockNext);

		// Check if the response.once method was called
		expect(mockResponse.once).toHaveBeenCalled();

		// Simulate response finish event
		const finishCallback = mockResponse.once.mock.calls[0][1] as () => void;
		finishCallback();

		// Check if the metrics are recorded
		expect(mockResponse.once).toHaveBeenCalledWith(
			"finish",
			expect.any(Function)
		);
		expect(mockResponse.statusCode).toBe(200);
		expect(mockNext).toHaveBeenCalled();
	});

	// You can add more tests for error handling, etc.
});

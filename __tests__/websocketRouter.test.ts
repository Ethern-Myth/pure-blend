import { websocketRouter, CustomRouterRequest } from "../src";
import { WebSocket } from "ws";

describe("websocketRouter", () => {
	// Define mock WebSocketRoutes
	const mockRoutes = {
		"/test": jest.fn(),
		"/another-route": jest.fn(),
	};

	// Mock Request, Response, and NextFunction objects
	const mockRequest = {
		url: "/test",
	} as CustomRouterRequest;

	const mockResponse = {} as any;
	const mockNext = jest.fn();

	// Mock WebSocket object
	const mockWebSocket = {} as WebSocket;

	// Test the websocketRouter function
	it("should call the appropriate route handler if route exists", () => {
		const router = websocketRouter(mockRoutes);
		mockRequest.websocket = mockWebSocket;
		router(mockRequest, mockResponse, mockNext);
		expect(mockRoutes["/test"]).toHaveBeenCalledWith(
			mockWebSocket,
			mockRequest
		);
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should call next middleware if route does not exist", () => {
		const router = websocketRouter(mockRoutes);
		mockRequest.url = "/non-existing-route";
		router(mockRequest, mockResponse, mockNext);
		expect(mockNext).toHaveBeenCalled();
	});
});

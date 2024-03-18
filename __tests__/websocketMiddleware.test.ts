import { Request, Response, NextFunction } from "express";
import WebSocket from "ws";
import { websocketMiddleware } from "../src";

describe("websocketMiddleware", () => {
	it("should call the WebSocket handler when request is for WebSocket upgrade", () => {
		const mockWebSocket = {} as WebSocket;
		const mockRequest = {
			headers: {
				upgrade: "websocket",
			},
			websocket: mockWebSocket,
		} as unknown as Request;

		const mockResponse = {} as Response;
		const mockNext = jest.fn() as NextFunction;

		const mockWebSocketHandler = jest.fn();
		const middleware = websocketMiddleware(mockWebSocketHandler);

		middleware(mockRequest, mockResponse, mockNext);

		expect(mockNext).not.toHaveBeenCalled();
		expect(mockWebSocketHandler).toHaveBeenCalledWith(
			mockRequest,
			mockWebSocket,
			expect.any(Function)
		);
	});

	it("should call next function if request is not for WebSocket upgrade", () => {
		const mockRequest = {
			headers: {
				upgrade: "http",
			},
			websocket: {} as WebSocket,
		} as unknown as Request;

		const mockResponse = {} as Response;
		const mockNext = jest.fn() as NextFunction;

		const mockWebSocketHandler = jest.fn();
		const middleware = websocketMiddleware(mockWebSocketHandler);

		middleware(mockRequest, mockResponse, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockWebSocketHandler).not.toHaveBeenCalled();
	});
});

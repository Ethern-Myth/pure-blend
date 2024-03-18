import { RequestHandler, Request, Response, NextFunction } from "express";
import { WebSocket } from "ws";

// Define a custom request interface that extends the default Express request interface
export interface CustomSocketRequest extends Request {
	websocket?: WebSocket; // Add the websocket property
}

export type WebSocketHandler = (
	req: CustomSocketRequest,
	socket: WebSocket,
	next: () => void
) => void;

function websocketMiddleware(wsHandler: WebSocketHandler): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		// Cast the request object to CustomSocketRequest to access the websocket property
		const customReq = req as CustomSocketRequest;

		if (
			req.headers &&
			req.headers.upgrade &&
			req.headers.upgrade.toLowerCase() === "websocket" &&
			customReq.websocket
		) {
			wsHandler(customReq, customReq.websocket, next);
		} else {
			next();
		}
	};
}

export default websocketMiddleware;

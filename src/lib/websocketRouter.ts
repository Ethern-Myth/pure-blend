import { RequestHandler, Request, Response, NextFunction } from "express";
import { WebSocket } from "ws";

// Define a custom request interface that extends the default Express request interface
export interface CustomRouterRequest extends Request {
	websocket: WebSocket; // Add the websocket property
}

export type WebSocketRoutes = {
	[key: string]: (socket: WebSocket, req: CustomRouterRequest) => void;
};

function websocketRouter(routes: WebSocketRoutes): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		const routeHandler = routes[req.url];
		if (routeHandler) {
			routeHandler(
				(req as CustomRouterRequest).websocket,
				req as CustomRouterRequest
			); // Cast req to CustomRequest
		} else {
			console.error("No handler found for WebSocket route:", req.url);
			next(); // Call next to continue to the next middleware/route handler
		}
	};
}

export default websocketRouter;

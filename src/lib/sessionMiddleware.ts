import { Request, Response, NextFunction } from "express";

export type SessionData = { [key: string]: any };

export interface CustomSessionRequest extends Request {
	session: SessionData;
}

function sessionMiddleware(
	session: SessionData
): (req: CustomSessionRequest, res: Response, next: NextFunction) => void {
	return function (
		req: CustomSessionRequest,
		res: Response,
		next: NextFunction
	) {
		req.session = session;
		next();
	};
}

export default sessionMiddleware;

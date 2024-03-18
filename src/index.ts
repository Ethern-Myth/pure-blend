import { CacheManager, CacheOptions } from "./cacheManager";
import { parseRoutes } from "./lib/parser";
import {
	OpenAPIDoc,
	OpenAPIPathItem,
	generateHTMLDoc,
	generateMarkdownDoc,
	generateOpenAPIDoc,
} from "./lib/generator";
import { generateAPIDocs } from "./generateApiDocs";
import { Route } from "./interfaces";
import performanceMonitoringMiddleware from "./prMiddleware";
import websocketMiddleware, {
	WebSocketHandler,
	CustomSocketRequest,
} from "./lib/websocketMiddleware";
import websocketRouter, {
	CustomRouterRequest,
	WebSocketRoutes,
} from "./lib/websocketRouter";
import sessionMiddleware, {
	SessionData,
	CustomSessionRequest,
} from "./lib/sessionMiddleware";

export {
	CacheManager,
	CacheOptions,
	parseRoutes,
	OpenAPIDoc,
	Route,
	OpenAPIPathItem,
	generateHTMLDoc,
	generateMarkdownDoc,
	generateOpenAPIDoc,
	generateAPIDocs,
	performanceMonitoringMiddleware,
	websocketMiddleware,
	CustomSocketRequest,
	WebSocketHandler,
	websocketRouter,
	WebSocketRoutes,
	CustomRouterRequest,
	sessionMiddleware,
	SessionData,
	CustomSessionRequest,
};

import { Request, Response, NextFunction } from "express";
import { CacheManager, CacheOptions } from "../src"; // Assuming the file is named CacheManager.ts
import NodeCache from "node-cache";
import Redis from "ioredis";

// Mocking NodeCache and Redis
jest.mock("node-cache");
jest.mock("ioredis");

describe("CacheManager", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("constructor", () => {
		it("should initialize with memory strategy", () => {
			const options: CacheOptions = {
				strategy: "memory",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);
			expect(NodeCache).toHaveBeenCalledTimes(1);
			expect(NodeCache).toHaveBeenCalledWith({
				stdTTL: options.expiration,
				deleteOnExpire: true,
				checkperiod: 600,
				useClones: false,
			});
		});

		it("should initialize with redis strategy", () => {
			const options: CacheOptions = {
				strategy: "redis",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);
			expect(Redis).toHaveBeenCalledTimes(1);
			expect(Redis).toHaveBeenCalledWith();
		});

		it("should throw error when providing both serialize and deserialize with redis", () => {
			const options: CacheOptions = {
				strategy: "redis",
				expiration: 3600,
				serialize: () => "",
				deserialize: () => {},
			};
			expect(() => new CacheManager(options)).toThrow(
				"Cannot provide both 'serialize' and 'deserialize' functions when using Redis"
			);
		});
	});

	describe("middleware", () => {
		it("should get cached data", () => {
			const options: CacheOptions = {
				strategy: "memory",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);
			const req = { originalUrl: "/test" };
			const res = {
				json: jest.fn(),
			};
			const next = jest.fn();

			// Spy on cache getter using type assertion to access private property
			jest
				.spyOn(cacheManager["cache"], "get")
				.mockReturnValue({ test: "data" });

			cacheManager.middleware(
				req as Request,
				res as unknown as Response,
				next as NextFunction
			);

			expect(res.json).toHaveBeenCalledWith({ test: "data" });
		});

		it("should cache data and call next", () => {
			const options: CacheOptions = {
				strategy: "memory",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);
			const req = { originalUrl: "/test" };
			const res = {
				json: jest.fn(),
			};
			const next = jest.fn();

			jest.spyOn(cacheManager["cache"], "get").mockReturnValue(null);

			cacheManager.middleware(
				req as Request,
				res as unknown as Response,
				next as NextFunction
			);
			expect(next).toHaveBeenCalled();
		});
	});

	describe("flushAll", () => {
		it("should flush all cache for memory strategy", () => {
			const options: CacheOptions = {
				strategy: "memory",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);

			cacheManager.flushAll();
			expect((cacheManager["cache"] as NodeCache).flushAll).toHaveBeenCalled();
		});

		it("should flush all cache for redis strategy", () => {
			const options: CacheOptions = {
				strategy: "redis",
				expiration: 3600,
			};
			const cacheManager = new CacheManager(options);

			cacheManager.flushAll();
			expect((cacheManager["cache"] as Redis).flushall).toHaveBeenCalled();
		});
	});
});

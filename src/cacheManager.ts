import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import Redis from "ioredis";

type CacheStrategy = "memory" | "redis";

export interface CacheOptions {
	strategy: CacheStrategy;
	expiration: number;
	deleteOnExpire?: boolean;
	checkperiod?: number;
	maxKeys?: number;
	cachePrefix?: string;
	serialize?: (data: any) => string;
	deserialize?: (data: string) => any;
	onCacheHit?: (key: string, value: any) => void;
	onCacheMiss?: (key: string) => void;
	[key: string]: any;
}

export class CacheManager {
	private cache: NodeCache | Redis;

	constructor(private options: CacheOptions) {
		if (options.strategy === "memory") {
			this.cache = new NodeCache({
				stdTTL: options.expiration,
				deleteOnExpire: options.deleteOnExpire ?? true,
				checkperiod: options.checkperiod || 600,
				maxKeys: options.maxKeys,
				useClones: false,
				...(options.cachePrefix && { keyPrefix: options.cachePrefix }),
				...(options.serialize && { serialize: options.serialize }),
				...(options.deserialize && { parse: options.deserialize }),
			});
		} else if (options.strategy === "redis") {
			this.cache = new Redis();
			if (options.cachePrefix) {
				// Prefix all keys with the provided cache prefix
				Redis.Command.setArgumentTransformer("set", (args) => {
					if (args.length > 1 && typeof args[1] === "string") {
						args[1] = `${options.cachePrefix}:${args[1]}`;
					}
					return args;
				});
			}
			if (options.serialize && options.deserialize) {
				throw new Error(
					"Cannot provide both 'serialize' and 'deserialize' functions when using Redis"
				);
			}
		} else {
			throw new Error("Invalid caching strategy");
		}
	}

	public middleware = (req: Request, res: Response, next: NextFunction) => {
		const key = req.originalUrl || req.url;
		const cachedData = this.cache.get(key);

		if (cachedData) {
			if (this.options.onCacheHit) {
				this.options.onCacheHit(key, cachedData);
			}
			return res.json(cachedData);
		}

		const originalJsonMethod = res.json;

		res.json = (body: any) => {
			if (this.options.strategy === "memory") {
				(this.cache as NodeCache).set(key, body);
			} else if (this.options.strategy === "redis") {
				const redisClient = this.cache as Redis;
				redisClient.set(
					key,
					JSON.stringify(body),
					"EX",
					this.options.expiration
				);
			}
			return originalJsonMethod.call(res, body);
		};

		if (this.options.onCacheMiss) {
			this.options.onCacheMiss(key);
		}
		next();
	};

	public flushAll = () => {
		if (this.options.strategy === "memory") {
			(this.cache as NodeCache).flushAll();
		} else {
			(this.cache as Redis).flushall(); // For Redis
		}
	};
}

import { performance } from "perf_hooks";
import * as promClient from "prom-client";
import { Request, Response, NextFunction } from "express";

// Create Prometheus metrics
const responseTimeMetric = new promClient.Histogram({
	name: "express_response_time_seconds",
	help: "Response time in seconds",
	labelNames: ["method", "route", "status"],
	buckets: [0.1, 0.5, 1, 2, 5], // Bucket ranges in seconds
});

const requestCounter = new promClient.Counter({
	name: "express_requests_total",
	help: "Total number of requests",
	labelNames: ["method", "route", "status"],
});

function performanceMonitoringMiddleware() {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const start = performance.now(); // Start time
			const startUsage = process.cpuUsage();

			// Function to calculate CPU usage
			function calculateCPUUsage(startUsage: NodeJS.CpuUsage) {
				const endUsage = process.cpuUsage(startUsage);
				const totalUsage = (endUsage.user + endUsage.system) / 1000; // Convert to milliseconds
				return totalUsage;
			}

			// Capture response finish event to calculate and log response time
			res.once("finish", () => {
				const end = performance.now();
				const responseTime = end - start;
				const cpuUsage = calculateCPUUsage(startUsage);
				const memoryUsage = process.memoryUsage().heapUsed / (1024 * 1024); // Convert to MB

				// Log response time, CPU, and memory usage
				console.log(`Response time: ${responseTime.toFixed(2)}ms`);
				console.log(`CPU usage: ${cpuUsage.toFixed(2)}ms`);
				console.log(`Memory usage: ${memoryUsage.toFixed(2)}MB`);

				// Record metrics for Prometheus
				responseTimeMetric
					.labels(req.method!, req.path, res.statusCode.toString())
					.observe(responseTime / 1000); // Convert to seconds
				requestCounter
					.labels(req.method!, req.path, res.statusCode.toString())
					.inc();
			});

			next(); // Proceed to next middleware
		} catch (error) {
			// Handle any errors that might occur
			console.error("Error in performanceMonitoringMiddleware:", error);
			next(error); // Pass the error to Express error handler middleware
		}
	};
}

export default performanceMonitoringMiddleware;

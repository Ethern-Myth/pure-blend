# Pure Blend

[![NPM](https://nodei.co/npm/pure-blend.png)](https://nodei.co/npm/pure-blend/)

[![npm downloads](https://img.shields.io/npm/dm/pure-blend)](https://www.npmjs.com/package/pure-blend)

<div align="center">

![Logo](/assets/logo/pure-blend.png)

</div>

## Pure Blend - Cache Manager

The Pure Blend - Cache Manager is a versatile caching module for Node.js applications, allowing developers to seamlessly integrate caching mechanisms into their Express.js middleware stack.

### Installation

You can install the Pure Blend Cache Manager via npm, yarn or pnpm:

---

```bash
npm install pure-blend
```

or

```bash
yarn add pure-blend
```

or

```bash
pnpm add pure-blend
```

---

### Usage

#### Importing and Initializing

```javascript
import { CacheManager, CacheOptions } from "pure-blend";
```

To initialize the cache manager, create an instance of `CacheManager` with the desired configuration options:

```javascript
const options: CacheOptions = {
    strategy: "memory", // or "redis"
    expiration: 3600,   // in seconds
    // Additional configuration options...
};

const cacheManager = new CacheManager(options);
```

#### Middleware Integration

To use the cache manager as middleware in an Express.js application:

```javascript
app.use(cacheManager.middleware);
```

This middleware will intercept requests, check if the data exists in the cache, and respond accordingly.

#### Configuration Options

- `strategy`: Specifies the caching strategy, either `"memory"` or `"redis"`.
- `expiration`: Time in seconds until cached data expires.
- `deleteOnExpire` (optional): Whether to delete expired cache entries automatically.
- `checkperiod` (optional): Time interval in seconds to check for expired cache entries.
- `maxKeys` (optional): Maximum number of keys to store in the cache.
- `cachePrefix` (optional): Prefix to prepend to all cache keys.
- `serialize` (optional): Function to serialize data before storing.
- `deserialize` (optional): Function to deserialize data after retrieval.
- `onCacheHit` (optional): Callback function executed when cache hit occurs.
- `onCacheMiss` (optional): Callback function executed when cache miss occurs.

#### Flushing Cache

To flush all cached data:

```javascript
cacheManager.flushAll();
```

### Example

```javascript
const express = require("express");
const { CacheManager } = require("pure-blend");

const app = express();

const options = {
    strategy: "memory",
    expiration: 3600,
};

const cacheManager = new CacheManager(options);

app.use(cacheManager.middleware);

app.get("/data", (req, res) => {
    const data = { message: "Hello, world!" };
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
```

**OTHER** example [here](./examples/CACHEMANAGER.md)

## Pure Blend - Generate API Docs

### `generateAPIDocs(app, format?, title?)`

Generates API documentation based on the provided Express application and format.

- **Parameters:**
  - `app`: The Express application object.
  - `format` (optional): The desired format for the documentation. It can be "openapi", "markdown", or "html". Defaults to "openapi".
  - `title` (optional): The title for the documentation. Defaults to "Express API Documentation".

- **Returns:**  
  The generated API documentation in the specified format. Returns a string for Markdown and HTML formats, and an object for OpenAPI format.

- **Throws:**  
  Throws an error if an invalid format is specified.

- **Example:**

  ```javascript
  import express from "express";
  import { generateAPIDocs } from "pure-blend";

  const app = express();

  // Define your routes...

  // Generate OpenAPI documentation
  const openAPIDoc = generateAPIDocs(app, "openapi", "Express API Documentation");

  // Generate Markdown documentation
  const markdownDoc = generateAPIDocs(app, "markdown", "Express API Documentation");

  // Generate HTML documentation
  const htmlDoc = generateAPIDocs(app, "html", "Express API Documentation");
  ```

**OTHER** example [here](./examples/APIDOCS.md)

---

## Pure Blend -  Performance Monitoring Middleware for Express

This middleware measures and logs the response time, CPU usage, and memory usage of each incoming HTTP request in an Express application. Additionally, it records metrics using Prometheus for further analysis and monitoring.

#### Usage

```javascript
import { performanceMonitoringMiddleware } from "pure-blend";

// Attach middleware to Express application
app.use(performanceMonitoringMiddleware());
```

#### Metrics Recorded

- **Response Time**: Measures the time taken for the server to respond to the request, in milliseconds.
- **CPU Usage**: Estimates the CPU time consumed during request processing, in milliseconds.
- **Memory Usage**: Reports the amount of memory used by the application, in megabytes.

#### Prometheus Metrics

- **express_response_time_seconds**: Histogram metric tracking the response time of HTTP requests, with labels for HTTP method, route, and response status code.
- **express_requests_total**: Counter metric counting the total number of HTTP requests processed, with labels for HTTP method, route, and response status code.

#### Dependencies

- **perf_hooks**: Node.js module for accessing performance-related functions.
- **prom-client**: Prometheus client library for Node.js applications.
- **express**: Web framework for Node.js used for building web applications and APIs.

#### Example

To use the provided `performanceMonitoringMiddleware` with an Express application in Node.js, follow these steps:

1. Import the middleware into your Express application file.
2. Attach the middleware to your Express application using `app.use()`.

Here's how you can do it:

```javascript
// Import required modules
import express from "express";
import { performanceMonitoringMiddleware } from "pure-blend";

// Create an Express application
const app = express();

// Attach the performance monitoring middleware to the Express application
app.use(performanceMonitoringMiddleware());

// Define routes and other middleware as needed
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

In this example:

- We import the `express` module to create an Express application.
- We import the `performanceMonitoringMiddleware` from the file where it's defined (`"./performanceMonitoringMiddleware"`).
- We attach the middleware to the Express application using `app.use(performanceMonitoringMiddleware())`.
- We define a simple route handler for the root URL (`"/"`).
- We start the Express server and listen on a specified port (`3000` by default).

```bash
Response time: 56.78ms
CPU usage: 123.45ms
Memory usage: 67.89MB
```

#### Error Handling

Any errors occurring during the middleware execution are logged, and if possible, passed to the Express error handler middleware for further processing.

----

## Pure Blend - WebSocket Integration

### sessionMiddleware

#### Overview

The `sessionMiddleware` is a middleware function for Express applications that facilitates session management by attaching session data to the request object.

#### Usage

```typescript
import { sessionMiddleware, SessionData, CustomSessionRequest } from "pure-blend";
import express from "express";

const app = express();

// Define session data
const sessionData: SessionData = {
  userId: "123",
  username: "example_user"
};

// Apply session middleware
app.use(sessionMiddleware(sessionData));
```

#### API

```typescript
sessionMiddleware(session: SessionData): (req: CustomSessionRequest, res: Response, next: NextFunction) => void
```

- `session`: Session data to attach to the request object.

#### Example

```typescript
import { sessionMiddleware, SessionData, CustomSessionRequest } from "pure-blend";
import express from "express";

const app = express();

// Define session data
const sessionData: SessionData = {
  userId: "123",
  username: "example_user"
};

// Apply session middleware
app.use(sessionMiddleware(sessionData));

// Access session data in routes
app.get("/", (req: CustomSessionRequest, res) => {
  console.log(req.session); // Outputs: { userId: "123", username: "example_user" }
  res.send("Session data retrieved!");
});
```

#### Features

- Attach session data to request objects.
- Simple integration into Express applications.

---

### websocketMiddleware

#### Overview

The `websocketMiddleware` is a middleware function for handling WebSocket connections in Express applications.

#### Usage

```typescript
import { websocketMiddleware , WebSocketHandler, CustomSocketRequest } from "pure-blend";
import express from "express";

const app = express();

// Define WebSocket handler
const wsHandler: WebSocketHandler = (req: CustomSocketRequest, socket, next) => {
  // WebSocket handling logic
};

// Apply WebSocket middleware
app.use(websocketMiddleware(wsHandler));
```

#### API

```typescript
websocketMiddleware(wsHandler: WebSocketHandler): RequestHandler
```

- `wsHandler`: WebSocket connection handling function.

#### Example

```typescript
import { websocketMiddleware, WebSocketHandler, CustomSocketRequest } from "pure-blend";
import express from "express";

const app = express();

// Define WebSocket handler
const wsHandler: WebSocketHandler = (req: CustomSocketRequest, socket, next) => {
  // WebSocket handling logic
};

// Apply WebSocket middleware
app.use(websocketMiddleware(wsHandler));

// WebSocket route
app.ws("/chat", (ws, req) => {
  // WebSocket route logic
});
```

#### Features

- Facilitates WebSocket handling in Express applications.
- Integrates WebSocket handling logic with other middleware.

---

### websocketRouter

#### Overview

The `websocketRouter` function generates a middleware for routing WebSocket requests in Express applications.

#### Usage

```typescript
import { websocketRouter, WebSocketRoutes } from "pure-blend";
import express from "express";

const app = express();

// Define WebSocket routes
const routes: WebSocketRoutes = {
  "/chat": (socket, req) => {
    // WebSocket route logic
  }
};

// Apply WebSocket router middleware
app.use(websocketRouter(routes));
```

#### API

```typescript
websocketRouter(routes: WebSocketRoutes): RequestHandler
```

- `routes`: Object containing WebSocket routes and their handlers.

#### Example

```typescript
import { websocketRouter, WebSocketRoutes } from "pure-blend";
import express from "express";

const app = express();

// Define WebSocket routes
const routes: WebSocketRoutes = {
  "/chat": (socket, req) => {
    // WebSocket route logic
  }
};

// Apply WebSocket router middleware
app.use(websocketRouter(routes));

// WebSocket route
app.ws("/chat", (ws, req) => {
  // WebSocket route logic
});
```

1. **Using sessionMiddleware.ts**:

```javascript
import express from 'express';
import { sessionMiddleware, SessionData, CustomSessionRequest } from 'pure-blend';

const app = express();

// Define your session data
const session: SessionData = {};

// Apply session middleware
app.use(sessionMiddleware(session));

// Now you can access session data in your routes
app.get('/', (req: CustomSessionRequest, res) => {
    console.log(req.session); // Access session data
    res.send('Session data accessed!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

2. **Using websocketMiddleware.ts**:

```javascript
import express from 'express';
import http from 'http';
import { WebSocket } from 'ws';
import { websocketMiddleware, CustomSocketRequest, WebSocketHandler } from 'pure-blend';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Define your WebSocket handler function
const wsHandler: WebSocketHandler = (req: CustomSocketRequest, socket, next) => {
    console.log('WebSocket connected!');
    // Handle WebSocket logic here
};

// Apply WebSocket middleware
app.use(websocketMiddleware(wsHandler));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

3. **Using websocketRouter.ts**:

```javascript
import express from 'express';
import http from 'http';
import { WebSocket } from 'ws';
import { websocketRouter, CustomRouterRequest, WebSocketRoutes } from 'pure-blend';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Define your WebSocket routes
const routes: WebSocketRoutes = {
    '/chat': (socket: WebSocket, req: CustomRouterRequest) => {
        console.log('WebSocket route: /chat');
        // Handle WebSocket logic for /chat route
    },
    '/notifications': (socket: WebSocket, req: CustomRouterRequest) => {
        console.log('WebSocket route: /notifications');
        // Handle WebSocket logic for /notifications route
    }
};

// Apply WebSocket router middleware
app.use(websocketRouter(routes));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### Features

- Simplifies WebSocket routing in Express applications.
- Provides a clean approach for handling WebSocket routes.

-----

### Contributing

Contributions are welcome! Please open an issue or pull request on the GitHub repository.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Author

Developed by [Ethern Myth](https://github.com/Ethern-Myth).

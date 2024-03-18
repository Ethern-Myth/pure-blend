# Examples - cacheManager

## Example 1

Here's how you can use it:

```javascript
import express from "express";
import { CacheManager, CacheOptions } from "pure-blend"; 

const app = express();

// Define cache options
const cacheOptions: CacheOptions = {
    strategy: "memory", // or "redis" depending on the chosen caching strategy
    expiration: 3600, // Cache expiration time in seconds
    // Other options as needed
};

// Create CacheManager instance
const cacheManager = new CacheManager(cacheOptions);

// Apply CacheManager middleware globally
app.use(cacheManager.middleware);

// Define your routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
```

## Example 2

1. **Import the necessary modules**:

   ```javascript
   import { Request, Response, NextFunction } from "express";
   import { CacheManager, CacheOptions } from "pure-blend"; 
   ```

2. **Create an instance of CacheManager**:

   ```javascript
   const cacheOptions: CacheOptions = {
       strategy: "memory", // or "redis" depending on the chosen caching strategy
       expiration: 3600, // Cache expiration time in seconds
       // Other options as needed
   };

   const cacheManager = new CacheManager(cacheOptions);
   ```

3. **Use the CacheManager middleware**:

   ```javascript
   // Example usage in an Express route handler
   app.get("/data", cacheManager.middleware, (req, res) => {
       // Your route handling logic here
       res.send("Data fetched from the database");
   });
   ```

   When this route is accessed, the middleware will first check if the requested data is cached. If cached data exists, it will be returned immediately. If not, the route handling logic will execute, and the response data will be cached for future requests.

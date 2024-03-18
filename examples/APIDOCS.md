# Examples - generateAPIDocs

## Example

```javascript
import express from "express";
import { generateAPIDocs } from "pure-blend";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/users", (req, res) => {
    // Handle user creation logic
    res.send("User created successfully");
});

// Endpoint to generate API documentation
app.get("/api/docs", (req, res) => {
    // Generate OpenAPI documentation
    const openAPIDoc = generateAPIDocs(app, "openapi", "My Express API Documentation");
    res.json(openAPIDoc);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
```

In this updated example:

1. We define a new endpoint `/api/docs` which will be used to generate and return the API documentation.
2. When a GET request is made to `/api/docs`, the `generateAPIDocs` function is called with our Express application object, specifying "openapi" as the format and "My Express API Documentation" as the title.
3. The generated OpenAPI documentation is sent back as a JSON response to the user who requested the documentation.
4. The server listens on port 3000.

Now, when you run this Express application and navigate to `http://localhost:3000/api/docs` in your browser or make a GET request to that endpoint, you will receive the generated OpenAPI documentation as the response. This allows users to easily access the API documentation from within the application.

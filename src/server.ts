// Import the Express app instance that we created in app.ts
import app from "./app";

// Define the port number where the server will listen for requests
const PORT = 3000;

// Start the server and make it listen on the defined port
// The callback function runs once the server is successfully up and running
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});


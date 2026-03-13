const express = require("express"); // import express framework
const cors = require("cors"); // import cors to allow cross-origin requests

// import route files
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");

const app = express(); // create express app


app.use(cors()); // enable CORS so frontend can access this API
app.use(express.json()); // parse incoming JSON data


// register routes
app.use("/projects", projectRoutes); // project related APIs
app.use("/", taskRoutes); // task related APIs


// simple route to check if API is working
app.get("/test", (req, res) => {
    res.send("API is working");
});


// start the server on port 5000
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
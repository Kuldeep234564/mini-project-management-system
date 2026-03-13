const express = require("express");
const router = express.Router();
const db = require("../db");


// Create a new project
router.post("/", (req, res) => {

    const { name, description } = req.body || {};

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    const sql = "INSERT INTO projects (name, description) VALUES (?, ?)";

    db.query(sql, [name, description], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Project created successfully",
            project_id: result.insertId
        });
    });

});


// Get all projects with pagination
router.get("/", (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sql = "SELECT * FROM projects LIMIT ? OFFSET ?";

    db.query(sql, [limit, offset], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });

});


// Get project by ID
router.get("/:id", (req, res) => {

    const sql = "SELECT * FROM projects WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });

});


// Delete project
router.delete("/:id", (req, res) => {

    const sql = "DELETE FROM projects WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({ message: "Project deleted successfully" });
    });

});


module.exports = router;
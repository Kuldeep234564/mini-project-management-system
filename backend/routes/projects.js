const express = require("express"); // importing express
const router = express.Router(); // creating router for project routes
const db = require("../db"); // database connection


// Create a new project
router.post("/", (req,res)=>{

    // getting data sent from client
    const {name, description} = req.body;

    // query to insert project in database
    const sql = "INSERT INTO projects (name, description) VALUES (?,?)";

    // run query
    db.query(sql,[name,description],(err,result)=>{

        // if something goes wrong
        if(err) return res.status(500).json(err);

        // project created successfully
        res.json({message:"Project created"});
    });
});


// Get all projects with pagination
router.get("/", (req,res)=>{

    // page number from request (default = 1)
    const page = parseInt(req.query.page) || 1;

    // number of records per page
    const limit = parseInt(req.query.limit) || 10;

    // calculate offset
    const offset = (page-1)*limit;

    // query to fetch projects
    const sql = "SELECT * FROM projects LIMIT ? OFFSET ?";

    db.query(sql,[limit,offset],(err,result)=>{

        // handle error
        if(err) return res.status(500).json(err);

        // return project list
        res.json(result);
    });

});


// Get project by id
router.get("/:id",(req,res)=>{

    const sql = "SELECT * FROM projects WHERE id=?";

    db.query(sql,[req.params.id],(err,result)=>{

        if(err) return res.status(500).json(err);

        res.json(result);
    });

});


// Delete project
router.delete("/:id",(req,res)=>{

    const sql = "DELETE FROM projects WHERE id=?";

    db.query(sql,[req.params.id],(err,result)=>{

        if(err) return res.status(500).json(err);

        res.json({message:"Project deleted"});
    });

});

module.exports = router; // exporting router
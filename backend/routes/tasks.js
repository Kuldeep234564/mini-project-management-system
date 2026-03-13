const express = require("express"); // import express
const router = express.Router(); // create router for task related routes
const db = require("../db"); // database connection


// create a task under a specific project
router.post("/projects/:project_id/tasks",(req,res)=>{

    // get task details from request body
    const {title,description,status,priority,due_date} = req.body;

    // insert new task into tasks table
    const sql = `
    INSERT INTO tasks 
    (project_id,title,description,status,priority,due_date)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(
    sql,
    [req.params.project_id,title,description,status,priority,due_date], // values for query
    (err,result)=>{
        if(err) return res.status(500).json(err); // handle database error

        res.json({message:"Task created"}); // success response
    });

});


// get all tasks of a specific project
router.get("/projects/:project_id/tasks",(req,res)=>{

    const status = req.query.status; // optional filter by status

    let sql = "SELECT * FROM tasks WHERE project_id=?"; // base query
    let params=[req.params.project_id]; // project id parameter

    // if status filter is provided
    if(status){
        sql += " AND status=?"; // add condition
        params.push(status); // add value to params
    }

    sql += " ORDER BY due_date"; // sort tasks by due date

    db.query(sql,params,(err,result)=>{
        if(err) return res.status(500).json(err); // handle error

        res.json(result); // return tasks list
    });

});


// update task details
router.put("/tasks/:id",(req,res)=>{

    // get updated task data
    const {title,description,status,priority,due_date} = req.body;

    const sql = `
    UPDATE tasks
    SET title=?,description=?,status=?,priority=?,due_date=?
    WHERE id=?
    `;

    db.query(
    sql,
    [title,description,status,priority,due_date,req.params.id], // values for update
    (err,result)=>{
        if(err) return res.status(500).json(err); // error handling

        res.json({message:"Task updated"}); // success response
    });

});


// delete task by id
router.delete("/tasks/:id",(req,res)=>{

    const sql="DELETE FROM tasks WHERE id=?"; // delete query

    db.query(sql,[req.params.id],(err,result)=>{
        if(err) return res.status(500).json(err); // error handling

        res.json({message:"Task deleted"}); // confirmation
    });

});

module.exports = router; // export router
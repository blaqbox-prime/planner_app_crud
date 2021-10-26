const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());



// get all tasks
app.get('/tasks',(req,res)=>{
    db.query('SELECT * FROM tasks',(err,result)=>{
        if(err){console.log(err)}
        console.log(result)
        const rows = result;
        res.json(result);
    })
})

// get one task
app.get("/tasks/:id",(req,res)=>{
    const id = req.params.id;

    db.query("SELECT * FROM tasks WHERE id = ?", id, (err, result) => {
        if(err) {console.log(err)}
        res.send({result})
    })
})

// create a task
app.post('/task/create',(req,res)=>{
    const {id, title, category, status, author, date} = req.body;

    console.log(req.body);
    db.query("INSERT INTO tasks (id, title, category, status, author, date) VALUES (?, ?, ?, ?, ?, ?)",
    [id, title, category, status, author, date], (err,result) => {
        if (err) {console.log(err)}
        console.log(result);
        res.send();
    })
})

// update task status

app.post('/task/update-status/:id',(req,res)=>{

    const id = req.params.id;
    const status = req.body.status; 
    
    db.query('UPDATE tasks SET status = ? WHERE id = ?',[status,id], (err, result)=>{
        if(err) {console.error(err)}
        console.log(result);
        res.send(result);
    })
})

// Update Task 
app.post('/task/update',(req,res)=>{
    const {id, title, category, date} = req.body;
    db.query('UPDATE tasks SET title = ?, category = ?, date = ? WHERE id = ?',[title, category, date, id],(err, result)=>{
        if(err) {console.error(err)}
        console.log(result);
        res.json(result);
    })
})

// Delete Task
app.delete('/task/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?',id, (err, result)=>{
        if (err) {console.log(err)}
        console.log({message: `task with id: ${id} was deleted successfuly`});
        res.send({message: `task with id: ${id} was deleted successfuly`}); 
    })
})

// ======================================================================================== END OF TASK API

// Run Server on Port
app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
})


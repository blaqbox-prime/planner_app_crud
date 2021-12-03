const express = require('express');
const db = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const IOPORT = process.env.IOPORT || 3005;
app.use(cors());
app.use(express.json());

// Auth routes
const authRoute = require('./routes/auth');

// auth middleware
app.use('/auth', authRoute);


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
    const {id, title, category, status, author, date, deadline} = req.body;

    console.log(req.body);
    db.query("INSERT INTO tasks (id, title, category, status, author, date, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, title, category, status, author, date, deadline], (err,result) => {
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
    const {id, title, category, deadline,} = req.body;
    db.query('UPDATE tasks SET title = ?, category = ?, deadline = ? WHERE id = ?',[title, category, deadline, id],(err, result)=>{
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

// =======================================================================================
// get all appointments
app.get('/appointments',(req,res)=>{
    db.query('SELECT * FROM appointments',(err,result)=>{
        if(err){console.log(err)}
        console.log(result)
        const rows = result;
        res.json(result);
    })
})

// get one task
app.get("/appointments/:id",(req,res)=>{
    const id = req.params.id;

    db.query("SELECT * FROM appointments WHERE id = ?", id, (err, result) => {
        if(err) {console.log(err)}
        res.send({result})
    })
})

// create a appointment
app.post('/appointment/create',(req,res)=>{
    const {id, title, author, date} = req.body;

    console.log(req.body);
    db.query("INSERT INTO appointments (id, title, author, date) VALUES (?, ?, ?, ?)",
    [id, title, author, date], (err,result) => {
        if (err) {console.log(err)}
        console.log(result);
        res.send();
    })
})


// Update appointment 
app.post('/appointment/update',(req,res)=>{
    const {id, title, date} = req.body;
    db.query('UPDATE appointments SET title = ?, date = ? WHERE id = ?',[title, date, id],(err, result)=>{
        if(err) {console.error(err)}
        console.log(result);
        res.json(result);
    })
})

// Delete appointment
app.delete('/appointment/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM appointments WHERE id = ?',id, (err, result)=>{
        if (err) {console.log(err)}
        console.log({message: `appointment with id: ${id} was deleted successfuly`});
        res.send({message: `appointment with id: ${id} was deleted successfuly`}); 
    })
})

// ===========================================================  Messages

app.get('/messages', async (req, res) => {
    db.query('SELECT * FROM messages',(err,res) => {
        if (err) {
           console.log(err);
           res.json(err);
        }
        console.log(res);
        res.json(res);
    });
})

// create message 
app.post('/message/create', async (req, res) => {
    const {uid, message, sender, recipient, date} = req.body;
    db.query("INSERT INTO messages (uid, message, sender, recipient, date) VALUES (?,?,?,?,?)", [uid, message, sender, recipient, date], (err, result) => {
        if(err){console.log(err);return}
        console.log(result);
        res.json(result);
    })
})

// Delete message
app.delete('/message/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM messages WHERE id = ?',id, (err, result)=>{
        if (err) {console.log(err)}
        console.log({message: `message with id: ${id} was deleted successfuly`});
        res.send({message: `message with id: ${id} was deleted successfuly`}); 
    })
})

// ======================================================================================== END OF TASK API

// Run Server on Port
app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
})


// Socket IO for IM =================================================================
const io = require("socket.io")(IOPORT, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected to server");

    
})


// ====================================================================================


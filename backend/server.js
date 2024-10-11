const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList');

var app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ToDoList"); //connecting with our database use "url"

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error", error);
})

//getting our tasks
app.get("/list", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err));
})

//adding new tasks
app.post("/list", (req, res) => {
    TodoModel.create({
        task: req.body.task,
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
})

//delete the tasks
app.delete("/list/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete({_id: id})
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
})

app.listen(3001, () => {
    console.log("Server is running - Port: 3001");
})

import axios from "axios";
import React from 'react';
import {useEffect, useState} from 'react';

function Todo(){
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");

    //function to fetch tasks from database
    useEffect(() => {
        axios.get('http://127.0.0.1:3001/list')
            .then(result => {
                setTodoList(result.data)
            })
            .catch(err => console.log(err))
    }, [])

    //function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if(!newTask){
            alert("Fill in the task");
            return;
        }
        axios.post('http://127.0.0.1:3001/list', {task: newTask})
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    //function to save edited data to database
    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask
        };
        if(!editedTask){
            alert("Fill in the task");
            return;
        }
        axios.post('http://127.0.0.1:3001/list/'+id)
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="container mt-5">
            <div className= "row">
                <div className="col-md-7">
                    <h2 className="text-center">Todo List</h2>
                    <div className="table-responsive">
                        <table className = "table-primary">
                            <thead className="table-primary">
                                <tr>
                                    <th>Task</th>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
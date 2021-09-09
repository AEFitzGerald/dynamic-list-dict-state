import React, { useState } from 'react';
// import styles from './Todo.module.css';


const ToDo = () => {

const [newTodo, setNewTodo] = useState("");
const [todoList, setTodoList] = useState([]);


const submitHandler = e => {
    e.preventDefault();
    console.log("The todo was submitted");
    if(newTodo.length === 0){
        return;
    }
    const todoItem = {
        text: newTodo,
        isComplete: false
    }
    setTodoList([...todoList, todoItem])
    console.log(todoList);
    setNewTodo("");
}

const deleteHandler = (delIndex) => {
    const filterTodoList = todoList.filter((todo, i) =>{
        return i !== delIndex;
    })
    setTodoList(filterTodoList);
} 

const checkboxHandler = (checkIndex) => {
    const updatedTodos = todoList.map((todo, i)=>{
        if(checkIndex === i) {
            todo.isComplete = !todo.isComplete;
        }
        return todo; 
    })
    setTodoList(updatedTodos);
}

    return (
        <div className= "d-flex justify-content-evenly">
            <div className="card container mt-3" style={{width: "20rem"}}>
                <form
                    onSubmit={(e) => {
                    submitHandler(e)
                    }}
                    > 
                    <input 
                    onChange={(e) => {
                    setNewTodo(e.target.value)
                    }} 
                    className="form-control-lg my-3"
                    placeholder="Enter New To-Do"
                    value= {newTodo}
                    type="text"
                    />
                    <div>
                        <button className= "btn btn-secondary btn-lg my-3">Add To List</button>
                    </div>
                </form>
            </div>
            <div className="card container mt-3" style={{width: "40rem"}}>
                <ul className="list-group list-group-flush">
                    {
                        todoList.map((todo, i) => {
                            const todoStyleClasses = [""];
                            if (todo.isComplete){
                                todoStyleClasses.push("line-through")
                            }
                        // each div is a unique child of the list and needs a unique key
                        // the key is unique, whereas the input of todo may be repeated and may not be unique
                            return <div className="row" key={i}>
                                    <input onChange= {(e) => {
                                        checkboxHandler(i)
                                        }}
                                        className="form-check-input col-1 p-3" 
                                        type="checkbox"  
                                        checked={todo.isComplete} 
                                    />
                                    <li className ="list-group-item col-9"><span className={todoStyleClasses.join("")}>{todo.text}</span></li> 
                                    <button onClick= {(e) =>{
                                        deleteHandler(i) }}
                                        className="btn btn-light btn-sm col-2 align-self-end">Delete</button>
                                    </div>
                            })
                    }
                </ul>
            </div>
        </div>
    );
};



export default ToDo;
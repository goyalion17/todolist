import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: true},
  ]);

  console.log()
  

  let[filter, setFilter] = useState<FilterValuesType>("all")
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter( t => t.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

function changeFilter(value: FilterValuesType): void{
    setFilter(value)
  }

  let tasksForTodolist = tasks
  if(filter === "completed"){
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }
  if(filter === "active"){
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist title="What to learn" 
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask} 
        />
    </div>
  );
}



export default App;

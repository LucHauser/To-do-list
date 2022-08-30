import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';

const defaultTasks: Array<ITask> = [
  { "taskDescription": "Feed the cats", "completed": false, "taskId": 1 },
  { "taskDescription": "Test the software", "completed": false, "taskId": 2 },

];

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  function addTask(task : ITask){
    let heigestId = 0;
    for (let i = 0; i < tasks.length;i++) {
      let currentId = tasks[i].taskId ?? 0;
      if (currentId > heigestId){
        heigestId = currentId;
      }
    }
    task.taskId = heigestId+1;
    setTasks([...tasks, task]);
  }

  function editTask(task: ITask){
    const id = task.taskId;
    if (id != null){
      tasks[id].completed = task.completed;
      tasks[id].taskDescription = task.taskDescription;
    }
    else {
      console.log("Id ist nicht vorhanden");
    }
  }

  function deleteTask(task: ITask){
    let tasksWithoutDelte = tasks.filter(currentTask => task.taskId  !== currentTask.taskId);
    setTasks(tasksWithoutDelte);
  }


  return (
    <div className="App">
      <TaskList tasks={tasks} edit={editTask} remove={deleteTask}></TaskList>
      <AddTaskForm add={addTask}></AddTaskForm>
    </div>
  );
}

export default App;

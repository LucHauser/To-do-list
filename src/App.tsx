import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import TaskEdit from './TaskEdit';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const emptyTask: ITask = { "title": "", "id": 0, "completed": false};

const defaultTasks: Array<ITask> = [
  { "title": "Feed the cats", "completed": false, "id": 1 },
  { "title": "Test the software", "completed": false, "id": 2 },

];

function App() {
  const baseURL = "http://localhost:3000/";
  const [tasks, setTasks] = useState(defaultTasks);
  const [taskToEdit, setTaskToEdit] = useState(emptyTask);

  React.useEffect(() => {
    axios.get(baseURL + "tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);
  if (!tasks) return null;


  function addTask(task : ITask){
    let heigestId = 0;
    for (let i = 0; i < tasks.length;i++) {
      let currentId = tasks[i].id ?? 0;
      if (currentId > heigestId){
        heigestId = currentId;
      }
    }
    task.id = heigestId+1;
    setTasks([...tasks, task]);
    axios.post(baseURL + 'tasks/', task);
  }

  function editTask(task: ITask){
    ReactDOM.render(<TaskEdit taskToEdit={task} save={saveEdit}></TaskEdit>, document.getElementById("TaskEdit"));
  }

  function saveEdit(task: ITask){
    const id = task.id;
    if (id != null){
      tasks[id].completed = task.completed;
      tasks[id].title = task.title;
    }
    else {
      console.log("Id ist nicht vorhanden");
    }
    let taskEdit = document.getElementById("EditTask")?.remove();
  }

  function deleteTask(task: ITask){
    let tasksWithoutDelte = tasks.filter(currentTask => task.id  !== currentTask.id);
    setTasks(tasksWithoutDelte);
  }

  return (
    <div className="App">
      <TaskList tasks={tasks} edit={editTask} remove={deleteTask}></TaskList>
      <AddTaskForm add={addTask}></AddTaskForm>
      <div id="TaskEdit">
      </div>
    </div>
  );
}

export default App;

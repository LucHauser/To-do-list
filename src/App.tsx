import React, {useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import TaskEdit from './TaskEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Login from './Login';

const emptyTask: ITask = { "title": "", "id": 0, "completed": false};

const defaultTasks: Array<ITask> = [
  { "title": "Feed the cats", "completed": false, "id": 1 },
  { "title": "Test the software", "completed": false, "id": 2 },

];

const emptyToken = "";

function App() {
  const baseURL = "http://localhost:3000/";
  const [tasks, setTasks] = useState(defaultTasks);
  const [taskToEdit, setTaskToEdit] = useState(emptyTask);
  const [tokenForApp, setTokenForApp] = useState(emptyToken);

  React.useEffect(() => {
    axios.get(baseURL + "auth/jwt/tasks", { headers: {"Authorization" : `Bearer ${tokenForApp}`}}).then((response) => {
      setTasks(response.data);
    });
  }, [tokenForApp]);
  if (!tasks) return null;


  function addTask(task : ITask){
    if (tokenForApp !== "")
    {
      let heigestId = 0;
      for (let i = 0; i < tasks.length;i++) {
        let currentId = tasks[i].id ?? 0;
        if (currentId > heigestId){
          heigestId = currentId;
        }
      }
      task.id = heigestId+1;
      axios.post(baseURL + 'auth/jwt/tasks', task, { headers: {"Authorization" : `Bearer ${tokenForApp}`}});
      setTasks([...tasks, task]);
      alert("Task added");
      }
      else {
        alert("You have to login");
      }
  }

  function editTask(task: ITask){
    if (tokenForApp !== "") {
      setTaskToEdit(task);
    }
    else {
      alert("You have to login");
    }
  }

  function saveEdit(task: ITask){
      const id = task.id;
      setTasks(tasks.map(i => (i.id === id ? task : i)));
      setTaskToEdit(emptyTask);
      axios.put(baseURL + "auth/jwt/tasks", task, { headers: {"Authorization" : `Bearer ${tokenForApp}`}});
      alert("Task is saved");
  }

  function deleteTask(task: ITask) {
    if (tokenForApp !== "") {
      let tasksWithoutDelte = tasks.filter(currentTask => task.id  !== currentTask.id);
      setTasks(tasksWithoutDelte);
      axios.delete(baseURL + "auth/jwt/task/" + task.id, { headers: {"Authorization" : `Bearer ${tokenForApp}`}});
      alert("Task is deleted");
    }
    else {
      alert("You have to login");
    }
  }

  function setToken(token: string){
    setTokenForApp(token);
    console.log(tokenForApp);
  }

  let addOrEdit;
  if (taskToEdit === emptyTask){
    addOrEdit = <AddTaskForm add={addTask}></AddTaskForm>;
  }
  else {
    addOrEdit = <TaskEdit taskToEdit={taskToEdit} save={saveEdit}></TaskEdit>;
  }
  if (tokenForApp !== "") {
    return (
      <div className="App">
        <TaskList tasks={tasks} edit={editTask} remove={deleteTask}></TaskList>
        {addOrEdit}
      </div>
    );
  }
  else
  {
    return <Login setToken={setToken}></Login>;
  }
}

export default App;

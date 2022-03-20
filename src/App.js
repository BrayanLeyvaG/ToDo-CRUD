import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToDosList } from './components/ToDosList';
import { ToDoForm } from './components/ToDoForm';

function App() {
  const [toDos, setToDos] = useState([])
  const [taskSelected, setTaskSelected] = useState(null)

  console.log(taskSelected)
    
  useEffect(() => {
    axios.get('https://todo-app-academlo.herokuapp.com/todos/')
    .then(res => setToDos(res.data))
  }, [])
  
  function deleteTask(id) {
    axios.delete(`https://todo-app-academlo.herokuapp.com/todos/${id}/`)
      .then(() => axios.get('https://todo-app-academlo.herokuapp.com/todos/'))
      .then(res => setToDos(res.data))

  }
  

  return (
    <div className="App">
      <ToDoForm setToDos={setToDos} taskSelected={taskSelected} setTaskSelected={setTaskSelected}/>
      <ToDosList toDos={toDos} setTaskSelected={setTaskSelected} deleteTask={deleteTask}/>
    </div>
  );
}

export default App;

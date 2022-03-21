import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToDosList } from './components/ToDosList';
import { ToDoForm } from './components/ToDoForm';

function App() {
  const [toDos, setToDos] = useState([])
  const [taskSelected, setTaskSelected] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


    
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
      <div className='title-bg'>
        <h1>To-Do List</h1>
        <button className='btn btn-new' onClick={() => setIsModalOpen(true)}><i className="fas fa-plus"></i> New task</button>
      </div>
      {isModalOpen && <ToDoForm setToDos={setToDos} taskSelected={taskSelected} setTaskSelected={setTaskSelected} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>}
      <ToDosList toDos={toDos} setTaskSelected={setTaskSelected} deleteTask={deleteTask} setToDos={setToDos} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}

export default App;

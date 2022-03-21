import axios from 'axios'
import React, { useState } from 'react'
import './ToDosList.css'

export const ToDosList = ({toDos, setTaskSelected, deleteTask, setToDos, setIsModalOpen}) => {
    const [checkSelected, setCheckSelected] = useState(null)


    function changeStatus(toDo) {
        setCheckSelected(toDo)
        axios.patch(`https://todo-app-academlo.herokuapp.com/todos/${toDo.id}/`, {isCompleted: !toDo.isCompleted})
            .then(() => axios.get('https://todo-app-academlo.herokuapp.com/todos/'))
            .then(res => setToDos(res.data))
    }

  return (
    <div className='list-container'>
        <table>
            <tbody>
            {toDos.map(toDo =>(
                <tr key={toDo.id}>
                    <td>
                        <div className='status' onClick={() =>  changeStatus(toDo)}>{toDo.isCompleted ? 
                            <div className='circle'><i className="fas fa-check"></i></div> : 
                            <div className='circle'></div> }
                        </div>
                    </td>
                    <td>
                        <div className='task-text'>
                            <h3>{toDo.isCompleted? <strike>{toDo.title}</strike> : toDo.title}</h3>
                            <p>{toDo.isCompleted? <strike>{toDo.description}</strike> : toDo.description}</p>
                        </div>
                    </td>
                    <td>
                        <div className='buttons-list'>
                            <button className='btn-list btn-edit' onClick={() => {setTaskSelected(toDo); setIsModalOpen(true)}}>Edit</button>
                            <button className='btn-list btn-delete' onClick={() => deleteTask(toDo.id)}>Delete</button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

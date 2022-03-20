import React from 'react'

export const ToDosList = ({toDos, setTaskSelected, deleteTask}) => {


  return (
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        {toDos.map(toDo =>(
            <tbody key={toDo.id}>
                <tr>
                    <td>{toDo.title}</td>
                    <td>{toDo.description}</td>
                    <td>{toDo.isCompleted? 'Completed' : 'Pending'}</td>
                    <td>
                        <button onClick={() => setTaskSelected(toDo)}>Edit</button>
                        <button onClick={() => deleteTask(toDo.id)}>Delete</button>
                    </td>
                </tr>
            </tbody>
        ))}
    </table>
  )
}

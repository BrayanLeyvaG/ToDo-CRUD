import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './ToDoForm.css'

export const ToDoForm = ({setToDos, taskSelected, setTaskSelected, setIsModalOpen, isModalOpen}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const defaultValues= {title: "", description: "", isCompleted: false}

    /* console.log(errors); */

    function cleanReload(e) {
        e.target.reset()
        axios.get('https://todo-app-academlo.herokuapp.com/todos/')
            .then(res => setToDos(res.data))
        
    }

    function onSubmit(data, e) {
        if(taskSelected){
            axios.put(`https://todo-app-academlo.herokuapp.com/todos/${taskSelected.id}/`, data)
                .then(() => cleanReload(e))
                .then(() => setTaskSelected(null))
                .then(() => reset(defaultValues))
                .then(() => setIsModalOpen(false))

        }else{
            axios.post('https://todo-app-academlo.herokuapp.com/todos/',data)
                .then(() => cleanReload(e))
                .then(() => reset(defaultValues))
                .then(() => setIsModalOpen(false))
        }
    }


    useEffect(() => {
        if(taskSelected){
            reset({
                title: taskSelected.title,
                description: taskSelected.description,
                isCompleted: taskSelected.isCompleted
            })
        }

    }, [taskSelected])

    function cancelBtn() {
        reset(defaultValues)
        setTaskSelected(null)
        setIsModalOpen(false)    
    }
    

    return (
        <div className='modal-bg'>
            <div className='modal-container'>
                <button className='btn-close' onClick={cancelBtn}> <i className="fas fa-times"></i> </button>
                <h2>New task</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor='title'>Title</label>    
                    <input className='input-text' type="text"  {...register("title", {required: true})} />


                    <label htmlFor='description'>Description</label>
                    <textarea rows={5} className='input-text' type="text" {...register("description", {required: true})} />

                    <div className='isCompleted'>
                        <label htmlFor='isCompleted'>Completed:</label>
                        <input className='checkbox' type="checkbox" {...register("isCompleted", {})} />
                    </div>
                    <div className="buttons-form">
                        <button className='btn-cancel btn' type='button' onClick={cancelBtn}>Cancel</button>
                        <input className='btn-add btn' type="submit" value="Add"/>
                    </div>
                </form>
            </div>
        </div>
    );
  }

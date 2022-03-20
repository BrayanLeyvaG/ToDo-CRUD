import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const ToDoForm = ({setToDos, taskSelected, setTaskSelected}) => {
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

        }else{
            axios.post('https://todo-app-academlo.herokuapp.com/todos/',data)
                .then(() => cleanReload(e))
                .then(() => reset(defaultValues))
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
    

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor='title'>Title</label>    
            <input type="text" placeholder="title" {...register("title", {required: true, maxLength: 20})} />
        </div>
        <div>
            <label htmlFor='description'>Description</label>
            <input type="text" placeholder="description" {...register("description", {required: true})} />
        </div>
        <div>
            <label>Completed:</label>
            <input type="checkbox" placeholder="isCompleted" {...register("isCompleted", {})} />
        </div>
        <input type="submit" />
      </form>
    );
  }

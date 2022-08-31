import React, { useEffect, useState } from 'react';
import ITask from './Interfaces';

export interface IProps {
    taskToEdit: ITask;
    save: (newItem : ITask) => void;
}

function TaskEdit (props: IProps) {
    const initTask = { "taskDescription": "", "taskId": 0, "completed": false};

    const [formValue, setFormValue] = useState(props.taskToEdit ?? initTask);
    useEffect(() => setFormValue(props.taskToEdit), [props]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    function onFormSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(formValue);
        props.save(formValue);
    }
    return (
        <div className='EditTask' id='EditTask'>
            <h2>Edit Task</h2>
            <form className="formAdd" onSubmit={onFormSubmit}>
                <label htmlFor='{description}'>Task Description: </label>
                <input type="text" id="description"
                value={formValue.title}
                name="title"
                onChange={onInputChange}/>
                <br/>
                <label htmlFor='{completed}'>completed: </label>
                <input type="checkbox" id="completed"
                defaultChecked={formValue.completed}
                onChange={onInputChange}/>
                <button >Save</button>
            </form>
        </div>
    );
}

export default TaskEdit;
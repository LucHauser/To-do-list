import ITask from './Interfaces'
export interface IProps {
    tasks: ITask[];
    edit: (item : ITask) => void;
    remove: (item : ITask) => void;
}
function TaskList(props: IProps) {

    function editTask(task : ITask){
        props.edit(task);
    }

    function remove (task : ITask){
        props.remove(task);
    }

    return (
        <div className="list">
            <table className='table table-light'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Completed</td>
                        <td>Delete</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.completed ? "Yes": "No"}</td>
                                <td><button type='button' className='btn btn-danger' onClick={() => remove(task)}>Löschen</button></td>
                                <td><button type='button' className='btn btn-success' onClick={() => editTask(task)}>Edit</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;

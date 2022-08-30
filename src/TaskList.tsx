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
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Titel</td>
                        <td>Completed</td>
                        <td><td>Actions</td></td>
                        <td><td>Actions</td></td>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task => {
                        return (
                            <tr key={task.taskId}>
                                <td>{task.taskId}</td>
                                <td>{task.taskDescription}</td>
                                <td>{task.completed}</td>
                                <td><button onClick={() => remove(task)}>Löschen</button></td>
                                <td><button onClick={() => editTask(task)}>Edit</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;

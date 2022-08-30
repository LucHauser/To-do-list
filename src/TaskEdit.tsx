import React, { useState } from 'react';
// import { ITask } from './ITask';
// {id,completed, title}: ITask

function Edit () {
    function test(){
        alert("Post");
    }
    return (
        <div className='EditTask'>
            <h2>Edit Task</h2>
            <label htmlFor='{title}'>Title: </label>
            <input type="text" id="title"/>
            <input type="submit" value="Submit"/>
            <br/>

            <label htmlFor='{completed}'>completed: </label>
            <input type="checkbox" id="completed"/>
        </div>
    );
}

export default Edit;
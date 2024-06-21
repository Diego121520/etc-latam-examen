// src/components/TaskManagerPage.js
import React from 'react';
import CreateTaskComponent from "./create-task-component";
import TaskComponent from "./task-component";

const TaskManagerPage = () => {
	return (
		<div>
			<CreateTaskComponent />
			<TaskComponent />
		</div>
	);
}

export default TaskManagerPage;
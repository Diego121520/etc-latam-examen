// src/components/TaskManagerPage.js
import React from 'react';
import CreateTaskComponent from "./create-task-component";
import TaskComponent from "./task-component";
import Header from "./header/header-component";

const TaskManagerPage = () => {
	return (
		<div>
			<Header></Header>
			<CreateTaskComponent />
			<TaskComponent />
		</div>
	);
}

export default TaskManagerPage;
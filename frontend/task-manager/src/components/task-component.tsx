import {useEffect, useState} from "react";
import UpdateTaskComponent from "../components/update-task-component";
import TaskClient from "../client/task-client";
import '../styles/task-styles.css';

export default function TaskComponent() {
	const [tasks, setTasks] = useState([{
		id: null,
		title:"",
		status:"",
		image : ""
	}])
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const isAuthenticated = !!localStorage.getItem('authToken');


	useEffect(() => {
		if(!isAuthenticated) {
			window.location.href = "/login"
		}
	}, []);


	const handleGetAllTaskByUserId = async () => {
		setModalVisible(false);
		try {
			const response = await TaskClient.getAllTask();

			if(response != null) {
				setTasks(response.data);
			}
		} catch (error) {
			setModalVisible(true);
			setModalMessage("Hubo un error al obtener las tareas");
		}
	};

	const handleDeleteTask = async (id) => {
		try {
			const deletedTask = await TaskClient.deleteTask(id);

			console.log(deletedTask)
			if(deletedTask.status === 200) {

				setModalVisible(true);
				setModalMessage("Tarea eliminada correctamente");
				await TaskClient.getAllTask()
			}
		} catch (error) {
			setModalVisible(true);
			setModalMessage("Hubo un error al eliminar la tarea");
		}
	}

	const closeModal = () => {
		setModalVisible(false);
		setShowUpdateModal(false);
	};

	const updateTaskModal = (task) => {
		setSelectedTask(task);
		setShowUpdateModal(true);
	}

	useEffect(() => {
		handleGetAllTaskByUserId();
	}, []);

	const updateTaskInList = (updatedTask) => {
		setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
	};

	return (
		<div className="d-flex align-items-center justify-content-center vh-50">
			<div className="container" style={{ maxWidth: '1500px' }}>
				<div className="row">
					<div className="col-md-4 mb-4 text-center">
						<h3>Pendientes</h3>
						<ul className="list-group">
							{tasks?.length > 0 ? tasks.map((t, i) => {
								if(t.status === "PENDING") {
									return (
										<li key={i} className="list-group-item task-item d-flex justify-content-between align-items-center">
											<div className="task-content d-flex align-items-center">
												<div className="task-title">{t.title}</div>
												{t.image && (
													<div className="task-image-container">
														<img
															src={`data:image/jpeg;base64,${t.image}`}
															alt="Task"
															className="task-image"
														/>
													</div>
												)}
											</div>
											<div className="task-actions">
												<button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteTask(t.id)}>X</button>
												<button className="btn btn-primary btn-sm mx-1" onClick={() => updateTaskModal(t)}>✏</button>
											</div>
										</li>
									)
								}
							}):(<h3>Sin tareas</h3>)}
						</ul>
					</div>
					<div className="col-md-4 mb-4 text-center">
						<h3>En progreso</h3>
						<ul className="list-group">
							{tasks?.length > 0 ? tasks.map((t, i) => {
								if(t.status === "IN_PROGRESS") {
									return (
										<li key={i} className="list-group-item task-item d-flex justify-content-between align-items-center">
											<div className="task-content d-flex align-items-center">
												<div className="task-title">{t.title}</div>
												{t.image && (
													<div className="task-image-container">
														<img
															src={`data:image/jpeg;base64,${t.image}`}
															alt="Task"
															className="task-image"
														/>
													</div>
												)}
											</div>
											<div className="task-actions">
												<button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteTask(t.id)}>X</button>
												<button className="btn btn-primary btn-sm mx-1" onClick={() => updateTaskModal(t)}>✏</button>
											</div>
										</li>
									)
								}
							}):(<h3>Sin tareas</h3>)}
						</ul>
					</div>
					<div className="col-md-4 mb-4 text-center">
						<h3>Terminadas</h3>
						<ul className="list-group">
							{tasks?.length > 0 ? tasks.map((t, i) => {
								if(t.status === "DONE") {
									return (
										<li key={i} className="list-group-item task-item d-flex justify-content-between align-items-center">
											<div className="task-content d-flex align-items-center">
												<div className="task-title">{t.title}</div>
												{t.image && (
													<div className="task-image-container">
														<img
															src={`data:image/jpeg;base64,${t.image}`}
															alt="Task"
															className="task-image"
														/>
													</div>
												)}
											</div>
											<div className="task-actions">
												<button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteTask(t.id)}>X</button>
												<button className="btn btn-primary btn-sm mx-1" onClick={() => updateTaskModal(t)}>✏</button>
											</div>
										</li>
									)
								}
							}):(<h3>Sin tareas</h3>)}
						</ul>
					</div>
				</div>
			</div>

			{modalVisible && (
				<div className="modal-background">
					<div className="modal-container">
						<div className="modal-header">
							<h3>Mensaje</h3>
							<button className="close-button" onClick={closeModal}>X</button>
						</div>
						<div className="modal-body">
							<p>{modalMessage}</p>
						</div>
						<div className="modal-footer">
							<button className="btn btn-dark" onClick={handleGetAllTaskByUserId}>Aceptar</button>
						</div>
					</div>
				</div>
			)}

			{showUpdateModal && (
				<UpdateTaskComponent
					show={showUpdateModal}
					handleClose={closeModal}
					setModalVisible={setModalVisible}
					setModalMessage={setModalMessage}
					task={selectedTask}
					updateTaskInList={updateTaskInList}
				/>
			)}

		</div>
	)


}

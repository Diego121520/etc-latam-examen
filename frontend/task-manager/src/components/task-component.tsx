import {getAllTaskByUserId} from '../client/taskClient';
import {useEffect, useState} from "react";
import UpdateTaskComponent from "../components/update-task-component";

export default function TaskComponent() {
	const [tasks, setTasks] = useState([{
		title:"",
		status:""
	}]);

	const [show, setShow] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const handleGetAllTaskByUserId = async (userId) => {
		setModalVisible(false);

		try {
			const updatedTask = await getAllTaskByUserId(userId);

			if(updatedTask != null) {
				setTasks(updatedTask);
			}
		} catch (error) {
			setModalVisible(true);
			setModalMessage("Hubo un error al obtener las tareas");
		}
	};

	const closeModal = () => {
		setModalVisible(false);
		setShow(false);
	};

	useEffect(() => {
		handleGetAllTaskByUserId(8);
	}, []);

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
										<li key={i} className="list-group-item d-flex justify-content-between align-items-center">
											{t.title}
											<span >
                                  <button className="btn btn-success btn-sm mx-1">✔</button>
                                  <button className="btn btn-warning btn-sm mx-1">✏</button>
                              </span>
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
										<li key={i} className="list-group-item d-flex justify-content-between align-items-center">
											{t.title}
											<span >
                                  <button className="btn btn-success btn-sm mx-1">✔</button>
                                  <button className="btn btn-warning btn-sm mx-1">✏</button>
                              </span>
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
										<li key={i} className="list-group-item d-flex justify-content-between align-items-center">
											{t.title}
											<span >
                                  <button className="btn btn-success btn-sm mx-1">✔</button>
                                  <button className="btn btn-warning btn-sm mx-1" onClick={() => setShow(true)}>✏</button>
                              </span>
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
							<h3>Error!</h3>
							<button className="close-button" onClick={closeModal}>X</button>
						</div>
						<div className="modal-body">
							<p>{modalMessage}</p>
						</div>
						<div className="modal-footer">
							<button className="btn btn-dark" onClick={handleGetAllTaskByUserId}>Reintentar</button>
						</div>
					</div>
				</div>
			)}

			<UpdateTaskComponent show={show} handleClose={closeModal}></UpdateTaskComponent>

		</div>
	)


}

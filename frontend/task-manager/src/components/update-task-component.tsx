import {useEffect, useState} from "react";
import TaskClient from "../client/task-client";
export default function UpdateTaskComponent ({ show, handleClose, setModalVisible, setModalMessage, task, updateTaskInList }) {
	const [newTask, setNewTask] = useState({
		title: task.title,
		description: task.description,
		status: task.status
	});

	useEffect(() => {
		setNewTask({
			title: task.title,
			description: task.description,
			status: task.status
		});
	}, [task]);


	const handleSubmit = (e) => {
		e.preventDefault();
		handleClose();
		handleUpdateTask(task.id);
	};

	const handleUpdateTask = async (id) => {
		try {
			const response = await TaskClient.updateTask(id, newTask);

			if (response) {
				setModalMessage( 'Tarea actualizada exitosamente!');
				setModalVisible(true);
				updateTaskInList(newTask);
			} else {
				setModalMessage('Hubo un error al actualizar la tarea');
				setModalVisible(true);
			}
		} catch (error) {
			setModalMessage('Error en la solicitud: ' + error.message);
			setModalVisible(true);
		}
	};

	if (!show) {
		return null;
	}

	return (
		<div className="modal show d-block" role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Actualizar Tarea</h5>
						<button type="button" className="btn-close" aria-label="close" onClick={handleClose}>
						</button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="title">Título</label>
								<input
									type="text"
									className="form-control"
									id="title"
									placeholder="Ingrese el título"
									value={newTask.title}
									onChange={(e) => setNewTask({...newTask, title:e.target.value})}
								/>
							</div>
							<div className="form-group mt-3">
								<label htmlFor="description">Descripción</label>
								<input
									type="text"
									className="form-control"
									id="description"
									placeholder="Ingrese la descripción"
									value={newTask.description}
									onChange={(e) => setNewTask({...newTask, description: e.target.value})}
								/>
							</div>
							<div className="form-group mt-3">
								<label htmlFor="status">Estado</label>
								<select
									className="form-control"
									id="status"
									value={newTask.status}
									onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
								>
									<option value="PENDING">Pendiente</option>
									<option value="IN_PROGRESS">En progreso</option>
									<option value="DONE">Terminada</option>
								</select>
							</div>
							<div className="text-center">
								<button type="submit" className="btn btn-primary mt-3">
								Actualizar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
import {useState} from "react";
import {updateTask} from "../client/taskClient";

export default function UpdateTaskComponent ({ show, handleClose }) {
	const [task, setTask] = useState({
		title: "",
		description: "",
		status: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		handleClose();
		handleUpdateTask();
	};

	const handleUpdateTask = async () => {
		try {
			const response = await updateTask(22, task);

			if (response) {
				// setModalMessage( 'Tarea actualizada exitosamente!');
				// setModalVisible(true);
			} else {
				// setModalMessage('Hubo un error al actualizar la tarea');
				// setModalVisible(true);
			}
		} catch (error) {
			// setModalMessage('Error en la solicitud: ' + error.message);
			// setModalVisible(true);
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
							<span>&times;</span>
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
									value={task.title}
									onChange={(e) => setTask({...task, title:e.target.value})}
								/>
							</div>
							<div className="form-group mt-3">
								<label htmlFor="description">Descripción</label>
								<input
									type="text"
									className="form-control"
									id="description"
									placeholder="Ingrese la descripción"
									value={task.description}
									onChange={(e) => setTask({...task, description: e.target.value})}
								/>
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
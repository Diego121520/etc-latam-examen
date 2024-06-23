import React, { useState } from 'react';
import { createTask } from '../client/taskClient';
import AvatarEditor from 'react-avatar-editor';
import '../styles/task-styles.css';

export default function CreateTaskComponent() {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [image, setImage] = useState(null); // Estado para la imagen subida
	const [editor, setEditor] = useState(null); // Referencia al editor de imagen
	const [croppedImage, setCroppedImage] = useState(null); // Estado para la imagen recortada

	const handleCreateTask = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('title', event.target.title.value);
		formData.append('description', event.target.description.value);
		formData.append('status', 'PENDING');
		formData.append('userId', "8");
		formData.append('image', croppedImage);

		try {
			const response = await createTask(formData);

			if (response.ok) {
				setModalMessage('Tarea creada exitosamente!');
			} else {
				setModalMessage('Hubo un error al crear la tarea');
			}
			setModalVisible(true);
		} catch (error) {
			setModalMessage('Error en la solicitud: ' + error.message);
			setModalVisible(true);
		}
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage({
					result:reader.result,
					name: file.name
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageCrop = () => {
		if (editor) {
			const canvas = editor.getImageScaledToCanvas();
			const croppedImageUrl = canvas.toDataURL();
			setCroppedImage(croppedImageUrl);

			setModalVisible(true);
			setModalMessage("Imagen recortada exitosamente!")
		}
	};

	const closeModal = () => {
		setModalVisible(false);
		setImage(false);
	};

	return (
		<div className="d-flex justify-content-center vh-60">
			<div className="container" style={{ maxWidth: '600px' }}>
				<div className="text-center my-5">
					<h1 className="display-4">Administrador de tareas</h1>
				</div>
				<form onSubmit={handleCreateTask} className="mb-5">
					<div className="form-group mb-3">
						<label htmlFor="title">Titulo</label>
						<input
							type="text"
							className="form-control"
							id="title"
							placeholder="Escribe el titulo de la tarea"
							required
						/>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="description">Descripción</label>
						<input
							type="text"
							className="form-control"
							id="description"
							placeholder="Describe la tarea"
							required
						/>
					</div>
					<div className="form-group mb-3 file-input-wrapper d-flex">
						<button className="custom-file-input">Subir Imagen</button>
						{image?.name ? <div key={1}>{image.name}</div> : ""}
						<input
							type="file"
							id="image"
							onChange={handleImageUpload}
							accept="image/*"
							required
						/>
					</div>
					{image?.result && (
						<div className="text-end">
						<div className="mb-3 text-center ml-4 border">
							<AvatarEditor
								ref={(editor) => setEditor(editor)}
								image={image.result}
								width={250}
								height={250}
								border={50}
								color={[255, 255, 255, 0.6]}
								scale={1.2}
								rotate={0}
							/>

						</div><button type="button" className="btn btn-primary mt-3" onClick={handleImageCrop}>
							Recortar imagen
						</button>
						</div>
					)}
					<div className="text-center">
						<button type="submit" className="btn btn-success btn-lg">
							Añadir tarea
						</button>
					</div>
				</form>
			</div>

			{modalVisible && (
				<div className="modal-background">
					<div className="modal-container">
						<div className="modal-header">
							<h3>Éxito!</h3>
							<button className="close-button" onClick={closeModal}>X</button>
						</div>
						<div className="modal-body">
							<p>{modalMessage}</p>
						</div>
						<div className="modal-footer">
							<button className="btn btn-success" onClick={closeModal}>Aceptar</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

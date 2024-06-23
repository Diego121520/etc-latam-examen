import React, { useState } from 'react';
import { createTask } from '../client/taskClient';
import AvatarEditor from 'react-avatar-editor';

export default function CreateTaskComponent() {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [image, setImage] = useState(null); // Estado para la imagen subida
	const [editor, setEditor] = useState(null); // Referencia al editor de imagen
	const [croppedImage, setCroppedImage] = useState(null); // Estado para la imagen recortada

	const handleCreateTask = async (event) => {
		event.preventDefault();

		const body = {
			title: event.target.title.value,
			description: event.target.description.value,
			status: 'PENDING',
			userId: 8,
			image: croppedImage,
		};

		try {
			console.log("POST " + croppedImage)
			const response = await createTask(body);

			if (response) {
				setModalMessage('Tarea creada exitosamente!');
				setModalVisible(true);
			} else {
				setModalMessage('Hubo un error al crear la tarea');
				setModalVisible(true);
			}
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
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageCrop = () => {
		if (editor) {
			const canvas = editor.getImageScaledToCanvas();
			const croppedImageUrl = canvas.toDataURL();
			setCroppedImage(croppedImageUrl);
		}
	};

	const closeModal = () => {
		setModalVisible(false);
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
					<div className="form-group mb-3">
						<label htmlFor="image">Imagen</label>
						<input
							type="file"
							className="form-control-file"
							id="image"
							onChange={handleImageUpload}
							accept="image/*"
							required
						/>
					</div>
					{image && (
						<div className="mb-3">
							<AvatarEditor
								ref={(editor) => setEditor(editor)}
								image={image}
								width={250}
								height={250}
								border={50}
								color={[255, 255, 255, 0.6]}
								scale={1.2}
								rotate={0}
							/>
							<button type="button" className="btn btn-primary mt-3" onClick={handleImageCrop}>
								Recortar imagen
							</button>
						</div>
					)}
					<div className="text-center">
						<button type="submit" className="btn btn-primary btn-lg">
							Añadir tarea
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

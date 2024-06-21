import React, { useState } from 'react';
import axios from 'axios';

export default function LoginComponent(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8092/api/login', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response)

            if (response) {
                setModalMessage( 'Inicio de sesión exitoso!');
                setModalVisible(true);
            } else {
                setModalMessage('Hubo un error con las credenciales');
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage('Error en la solicitud: ' + error.message);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const redirectModal = () => {
        window.location.href = "/login"
    }


    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <h1 className="display-4">Iniciar sesión</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2">Iniciar sesión</button>
                </form>
                <a href="/signup" className="btn btn-dark w-100 mt-2">Registrarse</a>
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
                            <button className="btn btn-success" >Continuar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

import React, { useState } from 'react';
import image from '../../images/etc-latam-logo.png';
import AuthClient from '../../client/auth-client';
export default function LoginComponent(props) {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthClient.login(data);

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

    const redirect = () => {
        window.location.href = "/task-manager"
    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    {/*<img className="mb-2" src={image}/>*/}
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
                            value={data.username}
                            onChange={(e) => setData({...data, username:e.target.value})}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData({...data, password:e.target.value})}
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
                            <h3>Mensaje</h3>
                            <button className="close-button" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body">
                            <p>{modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={redirect}>Continuar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

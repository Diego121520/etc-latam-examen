import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import '../modal/modal-styles.css';

export default function SignupFormComponent() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8091/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log(response)
            if (response.ok) {
                setModalMessage( 'Registro exitoso');
                setModalVisible(true);
            } else {
                setModalMessage('Error en el registro');
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
        <div className="d-flex align-items-center justify-content-center vh-100 test">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-5">
                    <h1 className="display-4">Registrarse</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            {...register('username', { required: true, validate: null })}
                        />
                        {errors.username && <div className="invalid-feedback">El usuario ya existe.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Teléfono</label>
                        <InputMask
                            mask="9999-9999"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phoneNumber"
                            {...register('phoneNumber')}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ageRange" className="form-label">Edad</label>
                        <select
                            className={`form-control ${errors.ageRange ? 'is-invalid' : ''}`}
                            id="ageRange"
                            {...register('ageRange')}
                        >
                            <option value="">Seleccionar rango de edad</option>
                            <option value="18-25">18-25</option>
                            <option value="26-35">26-35</option>
                            <option value="36-45">36-45</option>
                            <option value="46-60">46-60</option>
                            <option value="60+">60+</option>
                        </select>
                        {errors.ageRange && <div className="invalid-feedback">El rango de edad es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Género</label>
                        <select
                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                            id="gender"
                            {...register('gender', { required: true })}
                        >
                            <option value="">Seleccionar género</option>
                            <option value="MALE">Masculino</option>
                            <option value="FEMALE">Femenino</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">Género es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            {...register('password', {
                                required: true,
                                minLength: 8,
                                maxLength: 12,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/
                            })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                La contraseña debe contener entre 8-12 caracteres, letras, números, y una mayúscula.
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) => value === password || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">
                                {errors.confirmPassword.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>

                {modalVisible && (
                    <div className="modal-background">
                        <div className="modal-container">
                            <div className="modal-header">
                                <h3>Felicitaciones!</h3>
                                <button className="close-button" onClick={closeModal}>X</button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={redirectModal}>Continuar</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
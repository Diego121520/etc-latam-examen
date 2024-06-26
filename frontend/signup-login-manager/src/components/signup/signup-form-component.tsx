import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import '../modal/modal-styles.css';
import Wizard from "../wizard/wizard";
import UserClient from "../../client/user-client";
import classnames from 'classnames';

export default function SignupFormComponent() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        shouldFocusError: true
    });
    const password = watch('password');
    const username = watch('username');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [usernameExists, setUsernameExists] = useState(false);

    const handleCreateUser = async (data) => {
        try {
            const response = await UserClient.createUser(data);

            if (response.status === 200) {
                setModalMessage('Registro exitoso');
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

    const validateUsername = async (username) => {
        const response = await UserClient.checkIfUserExists(username);

        return response.data;
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const redirectModal = () => {
        window.location.href = "/login"
    };

    const onSubmit = (data) => {
        handleCreateUser(data);
    };

    const nextStep = () => {
        if(currentStep === 1) {
            validateUsername(username).then(response => {
                setUsernameExists(response);
                if (!response) {
                    setCurrentStep(currentStep + 1);
                }
            })
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 test">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-5">
                    <h1 className="display-4 mb-4">Registrarse</h1>
                    <Wizard step={currentStep}></Wizard>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {currentStep === 1 && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuario</label>
                                <input
                                    type="text"
                                    className={classnames('form-control', { 'is-invalid': usernameExists })}
                                    id="username"
                                    {...register('username', { required: true })}
                                />
                                {usernameExists && <div className="invalid-feedback">El usuario ya existe.</div>}
                            </div>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente</button>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
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
                            <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente</button>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
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
                            <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Anterior</button>
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </div>
                    )}
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
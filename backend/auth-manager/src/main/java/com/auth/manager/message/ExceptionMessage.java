package com.auth.manager.message;

public enum ExceptionMessage {

    USER_ALREADY_EXISTS("El usuario ya existe"),

    USER_NOT_FOUND("Usuario no encontrado"),

    INVALID_CREDENTIALS("Credenciales inválidas"),
    INVALID_USER_ID("ID de usuario inválido");

    public final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

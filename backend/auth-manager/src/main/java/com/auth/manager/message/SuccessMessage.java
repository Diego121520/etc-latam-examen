package com.auth.manager.message;

public enum SuccessMessage {
    SUCCESSFUL_LOGIN("Inicio de sesión exitoso!");

    private final String description;

    SuccessMessage(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

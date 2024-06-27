package com.user.manager.message;

public enum SuccessMessage {
    USER_CREATED("Usuario creado correctamente");

    public final String description;
    SuccessMessage(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }
}

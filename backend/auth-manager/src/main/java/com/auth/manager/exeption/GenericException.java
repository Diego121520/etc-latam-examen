package com.auth.manager.exeption;

import jakarta.ws.rs.core.Response.Status;

public class GenericException extends RuntimeException {
    private final Status httpStatus;

    public GenericException(String message, Status status) {
        super(message);
        this.httpStatus = status;
    }

    public Status getHttpStatus() {
        return httpStatus;
    }
}

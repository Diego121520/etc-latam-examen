package com.user.manager.exeption;

import com.user.manager.DTO.ExceptionResponseDTO;
import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception e) {

        if(e instanceof GenericException) {
            return this.handleUserException((GenericException) e);
        }

        return Response.status(Response.Status.NOT_FOUND)
                .entity(new ExceptionResponseDTO(HttpResponseStatus.BAD_GATEWAY.code(), "Error generico"))
                .build();
    }

    private Response handleUserException(GenericException e) {
        return Response
                .status(e.getHttpStatus())
                .entity(new ExceptionResponseDTO(e.getHttpStatus().getStatusCode(), e.getMessage())).build();
    }
}

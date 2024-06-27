package com.auth.manager.resource;

import com.auth.manager.DTO.UserLoginDTO;
import com.auth.manager.serviceImpl.LoginServiceImpl;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Path("/auth")
public class LoginResource {

    private final LoginServiceImpl loginService;

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    @Path("/login")
    public Response doLogin(UserLoginDTO userDTO) {

        return loginService.doLogin(userDTO);
    }

    @POST
    @Path("/validate-credentials")
    public Response validateCredentials() {

        return Response.ok().build();
    }

}

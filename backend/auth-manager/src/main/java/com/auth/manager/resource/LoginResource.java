package com.auth.manager.resource;

import com.auth.manager.DTO.UserLoginDTO;
import com.auth.manager.serviceImpl.LoginServiceImpl;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Path("/login")
public class LoginResource {

    private final LoginServiceImpl loginService;

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    @Path("")
    public Response doLogin(UserLoginDTO userDTO) {

        return loginService.doLogin(userDTO);
    }

}

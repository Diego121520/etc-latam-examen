package com.user.manager.resource;

import com.user.manager.DTO.UserDTO;
import com.user.manager.DTO.UserLoginDTO;
import com.user.manager.service.UserService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;


@AllArgsConstructor
@Path("/user")
public class UserResource {

    private final UserService userService;

    @POST
    public Response createUser(UserDTO userDTO) {

        try {
            userService.createUser(userDTO);
            return Response.ok("Usuario creado correctamente").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }

    }

    @GET
    @Path("/{username}")
    public Long getUserIdByUsername(@PathParam("username") String username) {
        return userService.getUserByUsername(username).getId();
    }

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    @Path("/verify")
    public Response verifyUser(UserLoginDTO userLoginDTO) {
       return Response.ok().entity(userService.verifyUser(userLoginDTO)).build();
    }

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/exist/{id}")
    public Response validateUser(@PathParam("id") Long userId) {

        return Response.ok().entity(userService.existUserById(userId)).build();
    };
}

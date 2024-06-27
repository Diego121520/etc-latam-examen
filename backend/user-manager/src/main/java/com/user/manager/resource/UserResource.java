package com.user.manager.resource;

import com.user.manager.DTO.UserDTO;
import com.user.manager.DTO.UserLoginDTO;
import com.user.manager.entity.User;
import com.user.manager.message.SuccessMessage;
import com.user.manager.repository.UserRepository;
import com.user.manager.service.UserService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

import java.util.List;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@AllArgsConstructor
@Path("/user")
public class UserResource {

    private final UserService userService;
private final UserRepository userRepository;
    @POST
    @Path("")
    public Response createUser(UserDTO userDTO) {

        userService.createUser(userDTO);

        return Response.ok(SuccessMessage.USER_CREATED.getDescription()).build();
    }

    @GET
    @Path("/{username}")
    public Long getUserIdByUsername(@PathParam("username") String username) {
        return userService.getUserByUsername(username).getId();
    }

    @POST
    @Path("/verify")
    public Response verifyUser(UserLoginDTO userLoginDTO) {
       return Response.ok().entity(userService.verifyUser(userLoginDTO)).build();
    }

    @GET
    @Path("/exist/id/{id}")
    public Response validateUser(@PathParam("id") Long userId) {

        return Response.ok().entity(userService.existUserById(userId)).build();
    };

    @GET
    @Path("/exist/username/{username}")
    public Response validateUser(@PathParam("username") String username) {

        return Response.ok().entity(userService.existUserByUsername(username)).build();
    };

    @GET
    @Path("/all")
    public List<User> getAll() {
        return userRepository.listAll();
    }

    @GET
    @Path("/id/{id}")
    public Boolean getUser(@PathParam("id") Long id) {
        return userRepository.findById(id) != null;
    }
}

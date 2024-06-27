package com.auth.manager.client;

import com.auth.manager.DTO.UserLoginDTO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(baseUri = "http://localhost:8091")
@Path("/api/user")
public interface UserRestClient {

    @POST
    @Path("/verify")
    Boolean verifyUser(UserLoginDTO userLoginDTO);

    @GET
    @Path("/{username}")
    Long getUserIdByUsername(@PathParam("username") String username,
                             @HeaderParam("request-type") String requestType);

    @GET
    @Path("/exist/id/{id}")
    Boolean isValidUser(@PathParam("id") Long userId);

}

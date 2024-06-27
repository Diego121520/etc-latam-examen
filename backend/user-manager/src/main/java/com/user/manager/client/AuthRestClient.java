package com.user.manager.client;

import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(baseUri = "http://localhost:8092")
@Path("/api/auth")
public interface AuthRestClient {

    @POST
    @Path("/validate-credentials")
    Response validateCredentials(
            @HeaderParam("Authorization") String authToken,
            @HeaderParam("X-CSRF-Token") String csrfToken);
}

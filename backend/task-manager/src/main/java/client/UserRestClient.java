package client;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(baseUri = "http://localhost:8091")
@Path("/api/user")
public interface UserRestClient {

    @GET
    @Path("/exist/id/{id}")
    Boolean isValidUser(@PathParam("id") Long userId, @HeaderParam("request-type") String requestType);

}

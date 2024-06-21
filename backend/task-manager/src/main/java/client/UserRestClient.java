package client;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(baseUri = "http://localhost:8091")
@Path("/api/user")
public interface UserRestClient {

    @GET
    @Path("/exist/{id}")
    Boolean isValidUser(@PathParam("id") Long userId);

}

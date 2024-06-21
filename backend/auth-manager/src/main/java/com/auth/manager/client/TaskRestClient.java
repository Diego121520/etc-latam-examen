package com.auth.manager.client;

import com.auth.manager.DTO.TaskDTO;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Produces(MediaType.APPLICATION_JSON)
@RegisterRestClient(baseUri = "http://localhost:8080")
@Path("/api/task")
public interface TaskRestClient {

    @POST
    @Path("")
    Boolean createTask(TaskDTO taskDTO);
}

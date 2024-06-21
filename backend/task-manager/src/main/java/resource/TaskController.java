package resource;

import DTO.TaskDTO;

import DTO.UpdateTaskDTO;
import entity.Task;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import service.TaskService;

import java.util.Base64;
import java.util.List;

@AllArgsConstructor
@Path("/task")
public class TaskController {

    private final TaskService taskService;

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    @Path("")
    public Response createTask(TaskDTO taskDTO) {
        byte[] imageBytes = new byte[0];

        if (taskDTO.image() != null) {
            try {
                imageBytes = Base64.getDecoder().decode(taskDTO.image());
            } catch (IllegalArgumentException e) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Invalid base64 image format").build();
            }
        }

        return Response.ok().entity(taskService.createTask(taskDTO, imageBytes)).build();
    }

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/all/user/{userId}")
    public Response getAllTaskByStatus(@PathParam("userId") Long userId) {
        List<Task> getAll = taskService.getAllTaskByStatus(userId);

        return Response.ok().entity(getAll).build();
    }

    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PATCH
    @Path("/{id}")
    public Response updateTask(@PathParam("id") Long id, UpdateTaskDTO taskDTO) {

        return Response.ok().entity(taskService.updateTask(id, taskDTO)).build();
    }

}

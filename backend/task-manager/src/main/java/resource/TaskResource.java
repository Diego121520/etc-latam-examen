package resource;

import DTO.TaskDTO;
import DTO.UpdateTaskDTO;
import entity.Task;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import message.SuccessMessage;
import service.TaskService;

import java.util.Base64;
import java.util.List;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@AllArgsConstructor
@Path("/task")
public class TaskResource {

    private final TaskService taskService;

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

    @GET
    @Path("/all/user/{userId}")
    public Response getAllTaskByUserId(@PathParam("userId") Long userId) {

        List<Task> getAll = taskService.getAllTaskByStatus(userId);

        return Response.ok().entity(getAll).build();
    }

    @PATCH
    @Path("/{id}")
    public Response updateTask(@PathParam("id") Long id, UpdateTaskDTO taskDTO) {

        return Response.ok().entity(taskService.updateTask(id, taskDTO)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTask(@PathParam("id") Long id) {
        taskService.deleteTask(id);

        return Response.ok().entity(SuccessMessage.TASK_DELETED.getDescription()).build();
    }

}

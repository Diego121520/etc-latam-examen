package serviceImpl;

import DTO.TaskDTO;
import DTO.UpdateTaskDTO;
import client.UserClient;
import entity.Task;
import enums.Status;
import exception.GenericException;
import io.smallrye.openapi.runtime.util.StringUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import message.ExceptionMessage;
import repository.TaskRepository;
import service.TaskService;

import java.util.List;

@AllArgsConstructor
@ApplicationScoped
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserClient userClient;

    @Transactional
    @Override
    public Boolean createTask(TaskDTO taskDTO, byte[] image) {

        if(!userClient.isValidUser(taskDTO.userId())) {
            throw new GenericException(ExceptionMessage.USER_NOT_FOUND.getMessage(), Response.Status.BAD_REQUEST);
        }

        Task task = new Task(taskDTO, image);

        taskRepository.persist(task);

        return true;
    }

    @Transactional
    @Override
    public Boolean updateTask(Long id, UpdateTaskDTO taskDTO) {
        Task task = taskRepository.findById(id);

        if(StringUtil.isNotEmpty(taskDTO.title())) {
            task.setTitle(taskDTO.title());
        }
        if(StringUtil.isNotEmpty(taskDTO.description())) {
            task.setDescription(taskDTO.description());
        }
        if(StringUtil.isNotEmpty(taskDTO.status())) {
            task.setStatus(Status.valueOf(taskDTO.status()));
        }

        taskRepository.persist(task);

        return true;
    }

    @Override
    public List<Task> getAllTaskByStatus(Long userId) {
        return taskRepository.getAllByStatus(userId);
    }

    @Transactional
    @Override
    public Boolean deleteTask(Long id) {
        Task task = taskRepository.findById(id);

        taskRepository.delete(task);

        return true;
    }
}

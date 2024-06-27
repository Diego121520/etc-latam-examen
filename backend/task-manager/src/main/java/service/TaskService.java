package service;

import DTO.TaskDTO;
import DTO.UpdateTaskDTO;
import entity.Task;

import java.util.List;

public interface TaskService {

    Boolean createTask(TaskDTO taskDTO, byte[] image);

    Boolean updateTask(Long id, UpdateTaskDTO taskDTO);

    List<Task> getAllTaskByStatus(Long userId);

    Boolean deleteTask(Long id);
}

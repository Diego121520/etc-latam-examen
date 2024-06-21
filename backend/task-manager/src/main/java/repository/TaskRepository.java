package repository;

import DTO.UpdateTaskDTO;
import entity.Task;
import enums.Status;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.smallrye.openapi.runtime.util.StringUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class TaskRepository implements PanacheRepository<Task> {

    public List<Task> getAllByStatus(Long userId) {
        return list("user = ?1", userId);
    }
}

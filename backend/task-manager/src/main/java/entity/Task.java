package entity;

import DTO.TaskDTO;
import enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Table(name = "tasks")
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image", nullable = false)
    private byte[] image;

    @Column(name = "user_id")
    private Long user;

    public Task(TaskDTO taskDTO, byte[] image) {
        this.status = Status.PENDING;
        this.title = taskDTO.title();
        this.description = taskDTO.description();
        this.image = image;
        this.user = taskDTO.userId();
    }

    public Task() {}
}

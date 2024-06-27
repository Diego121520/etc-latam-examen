package message;

public enum SuccessMessage {
    TASK_DELETED("Tarea eliminada correctamente");

    private final String description;

    SuccessMessage(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

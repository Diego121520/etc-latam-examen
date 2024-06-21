package com.auth.manager.DTO;

public record TaskDTO(
        String title,
        String description,
        String image,
        Long userId
) {


}

package com.user.manager.DTO;

import com.user.manager.enums.Gender;

public record UserDTO (
        String username,
        String ageRange,
        Gender gender,
        String phoneNumber,
        String password
        )
{


}

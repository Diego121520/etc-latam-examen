package com.user.manager.service;

import com.user.manager.DTO.UserDTO;
import com.user.manager.DTO.UserLoginDTO;
import com.user.manager.entity.User;

public interface UserService {

    void createUser(UserDTO userDTO);

    Boolean existUserById(Long userId);

    User getUserByUsername(String username);

    Boolean verifyUser(UserLoginDTO userLoginDTO);

    Boolean existUserByUsername(String username);

}

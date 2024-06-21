package com.user.manager.serviceImpl;

import com.user.manager.DTO.UserDTO;
import com.user.manager.DTO.UserLoginDTO;
import com.user.manager.entity.User;
import com.user.manager.exeption.GenericException;
import com.user.manager.message.ExceptionMessage;
import com.user.manager.repository.UserRepository;
import com.user.manager.security.RSAEncryptionUtil;
import com.user.manager.service.UserService;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@ApplicationScoped
public class UserServiceImpl implements UserService {

    private final RSAEncryptionUtil rsaEncryptionUtil;
    private final UserRepository userRepository;

    @Transactional
    public void createUser(UserDTO userDTO) {

        if(userRepository.existUserByUsername(userDTO.username())) {
            throw new GenericException(ExceptionMessage.USER_ALREADY_EXISTS.getMessage(), Response.Status.BAD_REQUEST);
        }

        String encryptedPassword = rsaEncryptionUtil.encrypt(userDTO.password());

        User user = new User(userDTO, encryptedPassword);

        userRepository.persist(user);
    }

    public Boolean existUserById(Long userId) {
       return userRepository.existUserById(userId);
    }

    public Boolean existUserByUsername(String username) {
        return userRepository.existUserByUsername(username);
    }

    @Override
    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username).orElseThrow(() ->
                new GenericException(ExceptionMessage.USER_NOT_FOUND.getMessage(), Response.Status.BAD_REQUEST));
    }

    @Override
    public Boolean verifyUser(UserLoginDTO userLoginDTO) {
        User user = getUserByUsername(userLoginDTO.username());

        try {
            return userLoginDTO.password().equals(rsaEncryptionUtil.decrypt(user.getPassword()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

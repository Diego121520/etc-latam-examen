package com.auth.manager.client;

import com.auth.manager.DTO.UserLoginDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class UserClient {

    private final UserRestClient userRestClient;

    @Inject
    public UserClient(@RestClient UserRestClient userRestClient) {
        this.userRestClient = userRestClient;
    }

    public Boolean verifyUser(UserLoginDTO userLoginDTO) {
        return userRestClient.verifyUser(userLoginDTO);
    }

    public Long getUserIdByUsername(String username) {
        return userRestClient.getUserIdByUsername(username, "internal");
    }

    public Boolean isValidUser(Long userId) {
        return userRestClient.isValidUser(userId);
    }
}

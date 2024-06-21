package com.auth.manager.client;

import com.auth.manager.DTO.UserLoginDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class UserClient {

    private final UserRestClient userRestClient;

    @Inject
    public UserClient(@RestClient UserRestClient userRestClient) {
        this.userRestClient = userRestClient;
    }

    public Boolean verifyUser(UserLoginDTO userLoginDTO) {
       try {

           return userRestClient.verifyUser(userLoginDTO);
       } catch (WebApplicationException e) {
            // Manejar la excepción
            e.printStackTrace();
        }
        return null;
    }

    public Long getUserIdByUsername(String username) {
        return userRestClient.getUserIdByUsername(username);
    }

    public Boolean isValidUser(Long userId) {
        return userRestClient.isValidUser(userId);
    }
}

package client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class UserClient {

    @Inject
    @RestClient
    UserRestClient userRestClient;

    public Boolean isValidUser(Long userId) {
       return userRestClient.isValidUser(userId, "internal");
    }

}

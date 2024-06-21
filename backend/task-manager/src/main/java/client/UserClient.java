package client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class UserClient {

    private final UserRestClient userRestClient;

    @Inject
    public UserClient(@RestClient UserRestClient userRestClient) {
        this.userRestClient = userRestClient;
    }


    public Boolean isValidUser(Long userId) {
       return userRestClient.isValidUser(userId);
    }

}

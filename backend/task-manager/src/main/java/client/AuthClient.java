package client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class AuthClient {

    @Inject
    @RestClient
    AuthRestClient authRestClient;

    public void validateCredentials(String authToken, String csrfToken) {
        authRestClient.validateCredentials(authToken, csrfToken);
    }
}

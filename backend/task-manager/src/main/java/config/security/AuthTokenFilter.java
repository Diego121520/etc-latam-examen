package config.security;

import client.AuthClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import lombok.AllArgsConstructor;


@ApplicationScoped
@AllArgsConstructor
@Provider
public class AuthTokenFilter implements ContainerRequestFilter {

    private final AuthClient authClient;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        // Obtener el token CSRF del encabezado de la solicitud
        String csrfToken = requestContext.getHeaderString("X-CSRF-Token");

        // Obtener el token de autenticación JWT
        String authHeader = requestContext.getHeaderString("Authorization");

        // Validar los tokens
        if (authHeader == null || csrfToken == null) {
            requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
            return;
        }

            authClient.validateCredentials(authHeader, csrfToken);
    }
}

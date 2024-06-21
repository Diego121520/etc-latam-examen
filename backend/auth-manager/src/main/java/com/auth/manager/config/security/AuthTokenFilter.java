package com.auth.manager.config.security;

import com.auth.manager.service.CsrfTokenService;
import com.auth.manager.serviceImpl.JwtTokenServiceImpl;
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

    private final JwtTokenServiceImpl jwtTokenService;
    private final CsrfTokenService csrfTokenService;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String path = requestContext.getUriInfo().getPath();

        // Excluir la ruta de inicio de sesión de la validación
        if (path.equals("/login")) {
            return;
        }

        // Obtener el token CSRF del encabezado de la solicitud
        String csrfToken = requestContext.getHeaderString("X-CSRF-Token");

        // Obtener el token de autenticación JWT
        String authHeader = requestContext.getHeaderString("Authorization");
        String jwtToken = authHeader != null ? authHeader.substring("Bearer ".length()) : null;

        // Validar los tokens (asegúrate de que los tokens sean válidos y coincidan)
        if (jwtToken == null || csrfToken == null || !validateTokens(jwtToken, csrfToken)) {
            requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
        }
    }

    private boolean validateTokens(String jwtToken, String csrfToken) {
        String subject = jwtTokenService.getSubjectFromToken(jwtToken);

        // Obtener el ID del usuario desde el JWT (aquí se asume que el subject es el ID del usuario)
        String storedCsrfToken = csrfTokenService.getCsrfToken(Long.parseLong(subject));

        return csrfToken != null && csrfToken.equals(storedCsrfToken);
    }

}

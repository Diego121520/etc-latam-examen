package com.auth.manager.serviceImpl;

import com.auth.manager.DTO.ResponseDTO;
import com.auth.manager.DTO.UserLoginDTO;
import com.auth.manager.client.UserClient;
import com.auth.manager.exeption.GenericException;
import com.auth.manager.message.ExceptionMessage;
import com.auth.manager.message.SuccessMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@ApplicationScoped
public class LoginServiceImpl {

    private final JwtTokenServiceImpl jwtTokenService;
    private final CsrfTokenServiceImpl csrfTokenService;
    private final UserClient userClient;

    public Response doLogin(UserLoginDTO userDTO) {
        Boolean isAuthenticated  = userClient.verifyUser(userDTO);

        if(!isAuthenticated ) {
            throw new GenericException(ExceptionMessage.INVALID_CREDENTIALS.getMessage(), Response.Status.UNAUTHORIZED);
        }

        Long userId = userClient.getUserIdByUsername(userDTO.username());

        String authToken = jwtTokenService.createToken(userId);

        String csrfToken = csrfTokenService.generateCsrfToken(userId);

        return Response.ok()
                .entity(new ResponseDTO(Response.Status.OK.getStatusCode(), SuccessMessage.SUCCESSFUL_LOGIN.getDescription()))
                .header("User-id", userId)
                .header("Authorization", "Bearer " + authToken)
                .header("X-CSRF-Token", csrfToken)
                .build();
    }
}

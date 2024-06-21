//package serviceImpl;
//
//import DTO.UserLoginDTO;
//import exception.GenericException;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.ws.rs.core.Response;
//import lombok.AllArgsConstructor;
//import message.ExceptionMessage;
//
//@AllArgsConstructor
//@ApplicationScoped
//public class LoginServiceImpl {
//
//    private final UserService userService;
//    private final JwtTokenServiceImpl jwtTokenService;
//    private final CsrfTokenServiceImpl csrfTokenService;
//
//    public Response doLogin(UserLoginDTO userDTO) {
//        Boolean isAuthenticated  = userService.verifyUser(userDTO.getUsername(), userDTO.getPassword());
//
//        if(!isAuthenticated ) {
//            throw new GenericException(ExceptionMessage.INVALID_CREDENTIALS.getMessage(), Response.Status.UNAUTHORIZED);
//        }
//
//        String authToken = jwtTokenService.createToken();
//
//        User user = userService.getUserByUsername(userDTO.getUsername());
//
//        String csrfToken = csrfTokenService.generateCsrfToken(user.getId());
//
//        return Response.ok("Inicio de sesión exitoso")
//                .header("Authorization", "Bearer " + authToken)
//                .header("X-CSRF-Token", csrfToken)
//                .build();
//    }
//}

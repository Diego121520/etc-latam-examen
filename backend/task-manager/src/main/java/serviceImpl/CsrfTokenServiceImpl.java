package serviceImpl;

import entity.CsrfToken;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import repository.CsrfTokenRepository;
import service.CsrfTokenService;

import java.util.UUID;

@AllArgsConstructor
@ApplicationScoped
public class CsrfTokenServiceImpl implements CsrfTokenService {

    private final CsrfTokenRepository csrfTokenRepository;
    @Transactional
    public String generateCsrfToken(Long userId) {
        // Verificar si ya existe un token CSRF para este usuario
        CsrfToken existingToken = csrfTokenRepository.findByUserId(userId);
        if (existingToken != null) {
            return existingToken.getToken();
        }

        // Generar un nuevo token CSRF único
        String csrfToken = UUID.randomUUID().toString();

        // Guardar el token CSRF en la base de datos
        CsrfToken newToken = new CsrfToken();
        newToken.setUserId(userId);
        newToken.setToken(csrfToken);
        csrfTokenRepository.persist(newToken);

        return csrfToken;
    }

    public String getCsrfToken(Long userId) {
        CsrfToken csrfToken = csrfTokenRepository.findByUserId(userId);
        return csrfToken != null ? csrfToken.getToken() : null;
    }

    @Transactional
    public void deleteCsrfToken(Long userId) {
        csrfTokenRepository.deleteByUserId(userId);
    }
}

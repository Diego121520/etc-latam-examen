package service;

public interface CsrfTokenService {

    String generateCsrfToken(Long userId);

    String getCsrfToken(Long userId);

    void deleteCsrfToken(Long userId);
}

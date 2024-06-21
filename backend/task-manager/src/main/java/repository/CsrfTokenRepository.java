package repository;

import entity.CsrfToken;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CsrfTokenRepository implements PanacheRepositoryBase<CsrfToken, Long> {

    public CsrfToken findByUserId(Long userId) {
        return find("userId", userId).firstResult();
    }

    public void deleteByUserId(Long userId) {
        delete("userId", userId);
    }
}

package com.user.manager.repository;

import com.user.manager.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    public Boolean existUserByUsername(String username) {
        return find("username", username).firstResult() != null;
    }

    public Boolean existUserById(Long userId) {
        return findById(userId) != null;
    }
    public Optional<User> findByUsername(String username) {
        return find("username", username).firstResultOptional();
    }
}

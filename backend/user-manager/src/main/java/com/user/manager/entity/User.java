package com.user.manager.entity;

import com.user.manager.DTO.UserDTO;
import com.user.manager.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Table(name = "Users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false, length = 1024)
    private String password;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "age_range", nullable = false)
    private String ageRange;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    public User(UserDTO userDTO, String encryptedPassword) {
        username = userDTO.username();
        this.ageRange = userDTO.ageRange();
        this.gender = userDTO.gender();
        this.phoneNumber = userDTO.phoneNumber();
        this.password = encryptedPassword;
    }

    public User() {}
}

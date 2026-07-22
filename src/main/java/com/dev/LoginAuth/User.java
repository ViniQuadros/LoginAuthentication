package com.dev.LoginAuth;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="Users")
public class User {
    public User() {}
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username, email, password;
}

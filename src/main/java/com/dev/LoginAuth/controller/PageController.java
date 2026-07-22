package com.dev.LoginAuth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/login")
    public String showLoginPage() {
        return "forward:/login.html";
    }

    @GetMapping("/user/register")
    public String showRegisterPage() {
        return "forward:/register.html";
    }
}

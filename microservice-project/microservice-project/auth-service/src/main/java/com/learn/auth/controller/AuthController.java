package com.learn.auth.controller;
import com.learn.auth.dto.*;
import com.learn.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token) {
        boolean valid = authService.validateToken(token);
        if (valid) {
            return ResponseEntity.ok(Map.of(
                "valid", true,
                "username", authService.getUsernameFromToken(token)
            ));
        }
        return ResponseEntity.status(401).body(Map.of("valid", false));
    }
}
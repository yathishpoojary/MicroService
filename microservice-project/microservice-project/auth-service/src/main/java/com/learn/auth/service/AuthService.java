package com.learn.auth.service;
import com.learn.auth.dto.*;
import com.learn.auth.model.AppUser;
import com.learn.auth.repository.UserRepository;
import com.learn.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public AuthResponse login(AuthRequest request) {
        AppUser user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername());
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername());
    }

    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    public String getUsernameFromToken(String token) {
        return jwtUtil.extractUsername(token);
    }
}
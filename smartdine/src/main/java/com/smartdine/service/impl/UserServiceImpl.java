package com.smartdine.service.impl;

import com.smartdine.dto.LoginRequest;
import com.smartdine.dto.SignupRequest;
import com.smartdine.dto.UserResponse;
import com.smartdine.model.User;
import com.smartdine.repository.UserRepository;
import com.smartdine.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserResponse signup(SignupRequest request) throws IllegalArgumentException {
        // Basic validation
        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Name, email and password are required.");
        }

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Email already registered.");
        }

        String hashed = passwordEncoder.encode(request.getPassword().trim());
        User u = new User(request.getName().trim(), email, hashed);
        userRepository.save(u);

        return new UserResponse(u.getId(), u.getName(), u.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest request) throws IllegalArgumentException {
        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Email and password are required.");
        }

        String email = request.getEmail().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid credentials.");
        }

        User user = userOpt.get();
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!matches) {
            throw new IllegalArgumentException("Invalid credentials.");
        }

        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}

package com.smartdine.service;

import com.smartdine.dto.LoginRequest;
import com.smartdine.dto.SignupRequest;
import com.smartdine.dto.UserResponse;

public interface UserService {
    UserResponse signup(SignupRequest request) throws IllegalArgumentException;
    UserResponse login(LoginRequest request) throws IllegalArgumentException;
}

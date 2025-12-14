package com.smartdine.controller;

import com.smartdine.dto.LoginRequest;
import com.smartdine.dto.SignupRequest;
import com.smartdine.dto.UserResponse;
import com.smartdine.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // allow calls from your React dev server
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        try {
            UserResponse res = userService.signup(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResult(true, "Signup successful", res));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResult(false, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResult(false, "Server error", null));
        }
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            UserResponse res = userService.login(req);
            return ResponseEntity.ok(new ApiResult(true, "Login successful", res));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResult(false, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResult(false, "Server error", null));
        }
    }
    static class ApiResult {
        private boolean success;
        private String message;
        private Object user;

        public ApiResult(boolean success, String message, Object user) {
            this.success = success; this.message = message; this.user = user;
        }
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Object getUser() { return user; }
    }
}

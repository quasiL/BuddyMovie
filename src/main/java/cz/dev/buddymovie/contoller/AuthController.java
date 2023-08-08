package cz.dev.buddymovie.contoller;

import cz.dev.buddymovie.model.LoginRequest;
import cz.dev.buddymovie.model.LoginResponse;
import cz.dev.buddymovie.model.RegisterRequest;
import cz.dev.buddymovie.service.AuthService;
import cz.dev.buddymovie.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        userService.createNewUser(request);
        return ResponseEntity.ok("User registered successfully");
    }
}

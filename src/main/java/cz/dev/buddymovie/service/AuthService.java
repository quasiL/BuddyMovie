package cz.dev.buddymovie.service;

import cz.dev.buddymovie.model.LoginResponse;
import cz.dev.buddymovie.security.JwtIssuer;
import cz.dev.buddymovie.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public LoginResponse attemptLogin(String email, String password) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal)authentication.getPrincipal();

        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
        return LoginResponse.builder()
                .accessToken(token)
                .userNumber(userService.findUserByEmail(email).orElseThrow().getUserNumber())
                .build();
    }
}

package cz.dev.buddymovie.security;

import cz.dev.buddymovie.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserService userService;

    /**
     * Converts UserEntity into a UserPrincipal
     * @param username user's email
     * @return UserPrincipal
     * @throws UsernameNotFoundException if user doesn't exist in the database
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userService.findUserByEmail(username).orElseThrow();
        var roles = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(String.valueOf(role)))
                .toList();
        return UserPrincipal.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .authorities(roles)
                .password(user.getPassword())
                .build();
    }
}

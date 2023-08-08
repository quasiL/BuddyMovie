package cz.dev.buddymovie.contoller;

import cz.dev.buddymovie.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/main")
public class AdminController {

    @GetMapping("/admin")
    public ResponseEntity<String> admin(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok("If you see this then you're an admin with ID " + principal.getUserId() + " Your roles: " + principal.getAuthorities().toString());
    }
}

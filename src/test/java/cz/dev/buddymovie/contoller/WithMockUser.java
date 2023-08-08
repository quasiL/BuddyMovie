package cz.dev.buddymovie.contoller;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockUserSecurityContextFactory.class)
public @interface WithMockUser {

    long userId() default 1L;
    String email() default "next@test.com";
    String password() default "$2y$10$NlGoE6qKRECpa19ZQm1Wh.M0LV9uIiYIzpfidikT/ust0Pn1HG9rK";
    String[] authorities() default "ROLE_USER";
}

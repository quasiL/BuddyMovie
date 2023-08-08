package cz.dev.buddymovie.model;

import cz.dev.buddymovie.validation.PasswordMatching;
import cz.dev.buddymovie.validation.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@PasswordMatching(
        password = "password",
        confirmPassword = "confirmPassword",
        message = "Password and Confirm Password must be matched!"
)
@Getter
public class RegisterRequest {

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @StrongPassword
    private String password;
    private String confirmPassword;

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 50)
    private String surname;

    @NotBlank
    @Size(max = 6)
    private String sex;
}

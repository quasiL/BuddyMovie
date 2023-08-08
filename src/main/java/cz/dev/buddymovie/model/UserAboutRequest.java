package cz.dev.buddymovie.model;

import jakarta.validation.constraints.Email;
import lombok.Getter;

@Getter
public class UserAboutRequest {

    private String userNumber;
    private String about;
    @Email
    private String publicEmail;
    private String avatar;
    private String discord;
    private String facebook;
    private String twitter;
}

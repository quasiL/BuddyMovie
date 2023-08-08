package cz.dev.buddymovie.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAboutResponse {

    private String firstName;
    private String lastName;
    private String about;
    private String publicEmail;
    private String avatar;
    private String discord;
    private String facebook;
    private String twitter;
}

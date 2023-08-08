package cz.dev.buddymovie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_about")
public class UserAboutEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "about")
    private String about;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "public_email")
    private String publicEmail;

    @Column(name = "discord")
    private String discord;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "twitter")
    private String twitter;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
}

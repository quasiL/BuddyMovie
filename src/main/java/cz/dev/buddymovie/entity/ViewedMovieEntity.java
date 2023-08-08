package cz.dev.buddymovie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "viewed_movies")
public class ViewedMovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "movie_number", nullable = false)
    private String movieNumber;

    @Column(name = "api_link", nullable = false)
    private String apiLink;

    @Column(name = "rating")
    private Byte rating;

    @Column(name = "is_viewed", nullable = false)
    private Boolean isViewed;

    @Column(name = "is_creator_movie" , nullable = false)
    private Boolean isCreatorMovie;
}

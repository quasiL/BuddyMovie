package cz.dev.buddymovie.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "movie_offers")
public class MovieOfferEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "offer_number", nullable = false)
    private String offerNumber;

    @ManyToOne
    @JoinColumn(name = "creator_id", referencedColumnName = "id", nullable = false)
    private UserEntity creator;

    @ManyToOne
    @JoinColumn(name = "applicant_id", referencedColumnName = "id")
    private UserEntity applicant;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "is_opened", nullable = false)
    private Boolean isOpened;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "movie_to_offer",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    private List<ViewedMovieEntity> movies;
}

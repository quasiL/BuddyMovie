package cz.dev.buddymovie.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieOfferResponse {

    private String offerNumber;
    private String creator;
    private String applicant;
    private Boolean isActive;
    private Boolean isOpened;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<ViewedMovieResponse> movies;
}

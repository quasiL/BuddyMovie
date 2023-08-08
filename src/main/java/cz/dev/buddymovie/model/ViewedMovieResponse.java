package cz.dev.buddymovie.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ViewedMovieResponse {

    private String movieNumber;
    private String apiLink;
    private Byte rating;
    private Boolean isViewed;
    private Boolean isCreatorMovie;
}

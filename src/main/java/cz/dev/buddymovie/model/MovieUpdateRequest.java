package cz.dev.buddymovie.model;

import lombok.Getter;

@Getter
public class MovieUpdateRequest {
    private String movieNumber;
    private Byte rating;
}

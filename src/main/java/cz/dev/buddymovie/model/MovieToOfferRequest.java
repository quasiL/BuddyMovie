package cz.dev.buddymovie.model;

import lombok.Getter;

import java.util.List;

@Getter
public class MovieToOfferRequest {

    private String offerNumber;
    private List<String> movies;
}

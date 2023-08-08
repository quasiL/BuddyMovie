package cz.dev.buddymovie.model;

import lombok.Getter;

import java.util.List;

@Getter
public class MovieOfferRequest {

    private String userNumber;
    private List<String> movies;
    private String offerNumber;
}

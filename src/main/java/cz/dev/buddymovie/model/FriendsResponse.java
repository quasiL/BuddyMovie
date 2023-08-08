package cz.dev.buddymovie.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FriendsResponse {

    private List<String> friends;
}

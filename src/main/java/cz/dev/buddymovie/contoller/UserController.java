package cz.dev.buddymovie.contoller;

import cz.dev.buddymovie.entity.FriendshipEntity;
import cz.dev.buddymovie.entity.MovieOfferEntity;
import cz.dev.buddymovie.model.*;
import cz.dev.buddymovie.security.UserPrincipal;
import cz.dev.buddymovie.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private static final String UPDATED_MESSAGE = "Successfully updated";

    @GetMapping("/user-number")
    public ResponseEntity<String> getUserNumber(@AuthenticationPrincipal UserPrincipal principal) {
        return new ResponseEntity<>(userService.getUserNumberByEmail(principal.getEmail()), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/get-about/{userNumber}")
    public UserAboutResponse getUserAbout(@PathVariable String userNumber) {
        return userService.getUserAboutInfo(userNumber);
    }

    @PutMapping("/update-about")
    public ResponseEntity<String> updateAbout(@Valid @RequestBody UserAboutRequest request) {
        userService.updateUserAbout(request);
        return new ResponseEntity<>(UPDATED_MESSAGE, HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/friends/{userNumber}")
    public List<String> getUserFriends(@PathVariable String userNumber) {
        return userService.getAllUserFriends(userNumber);
    }

    @PostMapping("/add-friend")
    public ResponseEntity<String> addFriend(@Valid @RequestBody FriendshipRequest request) {
        userService.addUserFriend(request);
        return new ResponseEntity<>("Successfully added", HttpStatus.CREATED);
    }

    @GetMapping("/offers/{offerNumber}")
    public MovieOfferResponse getOffer(@PathVariable String offerNumber) {
        return userService.getMovieOfferByNumber(offerNumber);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createOffer(@RequestBody MovieOfferRequest request) {
        return new ResponseEntity<>(userService.createNewMovieOffer(request), HttpStatus.CREATED);
    }

    @PutMapping("/apply")
    public ResponseEntity<String> applyToOffer(@RequestBody MovieOfferRequest request) {
        userService.applyToMovieOffer(request);
        return new ResponseEntity<>(UPDATED_MESSAGE, HttpStatus.OK);
    }

    @PutMapping("/movie/rate")
    public ResponseEntity<String> rateMovie(@RequestBody MovieUpdateRequest request) {
        userService.rateViewedMovie(request);
        return new ResponseEntity<>(UPDATED_MESSAGE, HttpStatus.OK);
    }

    @PutMapping("/movie/view")
    public ResponseEntity<String> viewMovie(@RequestBody MovieUpdateRequest request) {
        userService.setViewedMovie(request);
        return new ResponseEntity<>(UPDATED_MESSAGE, HttpStatus.OK);
    }

    @GetMapping("/active-offers")
    public Page<MovieOfferResponse> getActiveOffers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return userService.getAllActiveMovieOffers(PageRequest.of(page, size));
    }

    @GetMapping("/inactive-offers")
    public List<MovieOfferEntity> getInactiveOffers() {
        return userService.getAllInactiveMovieOffers();
    }
}

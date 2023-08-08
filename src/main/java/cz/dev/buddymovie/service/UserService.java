package cz.dev.buddymovie.service;

import cz.dev.buddymovie.entity.*;
import cz.dev.buddymovie.model.*;
import cz.dev.buddymovie.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private static final String USER_NOT_FOUND_EXCEPTION_MESSAGE = "User not found";
    private static final String OFFER_NOT_FOUND_EXCEPTION_MESSAGE = "Movie offer not found";
    private static final String USER_ALREADY_EXISTS_EXCEPTION_MESSAGE = "User already exists";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserAboutRepository userAboutRepository;
    private final FriendshipRepository friendshipRepository;
    private final MovieOfferRepository movieOfferRepository;
    private final ViewedMovieRepository viewedMovieRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom rand = new SecureRandom();

    /**
     * Generates a unique six-digit user number
     *
     * @return user number
     */
    private String generateUserNumber() {
        while (true) {
            var userNumber = Integer.toString(rand.nextInt(900000) + 100000);
            if (userRepository.findUserEntityByUserNumber(userNumber).isEmpty()) {
                return userNumber;
            }
        }
    }

    private String generateOfferNumber() {
        while (true) {
            var offerNumber = Integer.toString(rand.nextInt(9000000) + 1000000);
            if (movieOfferRepository.findMovieOfferEntityByOfferNumber(offerNumber).isEmpty()) {
                return offerNumber;
            }
        }
    }

    private String generateMovieNumber() {
        while (true) {
            var movieNumber = Integer.toString(rand.nextInt(90000) + 10000);
            if (movieOfferRepository.findMovieOfferEntityByOfferNumber(movieNumber).isEmpty()) {
                return movieNumber;
            }
        }
    }

    private UserEntity getUserEntityByUserNumber(String userNumber) {
        return userRepository.findUserEntityByUserNumber(userNumber)
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION_MESSAGE));
    }

    private List<ViewedMovieEntity> createViewedMovieListFromRequest(MovieOfferRequest request) {
        return request.getMovies().stream()
                .map(movie -> {
                    var viewedMovie = new ViewedMovieEntity();
                    viewedMovie.setMovieNumber(generateMovieNumber());
                    viewedMovie.setApiLink(movie);
                    viewedMovie.setIsViewed(false);
                    viewedMovie.setIsCreatorMovie(request.getOfferNumber() == null);
                    viewedMovieRepository.save(viewedMovie);
                    return viewedMovie;
                })
                .toList();
    }

    public String getUserNumberByEmail(String email) {
        return userRepository.findUserEntityByEmail(email).orElseThrow().getUserNumber();
    }

    /**
     * Creates a new user after successful submission of the registration form
     *
     * @param request valid sign up request
     */
    public void createNewUser(RegisterRequest request) {

        if (userRepository.findUserEntityByEmail(request.getEmail()).isPresent()) {
            throw new EntityNotFoundException(USER_ALREADY_EXISTS_EXCEPTION_MESSAGE);
        }

        var newUser = new UserEntity();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstName(request.getName());
        newUser.setLastName(request.getSurname());
        newUser.setSex(request.getSex());
        newUser.setUserNumber(generateUserNumber());

        newUser.setRoles(List.of(roleRepository.findByRole(Role.ROLE_USER)));
        userRepository.save(newUser);
        log.info("New user with ID {} has been created", newUser.getId());
    }

    /**
     * Finds a user by his email address
     *
     * @param email user email
     * @return UserEntity if the user exists
     */
    public Optional<UserEntity> findUserByEmail(String email) {
        var user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION_MESSAGE));
        log.info("User with ID {} is now logged in", user.getId());
        return Optional.of(user);
    }

    /**
     * Updates all values in UserAbout entity according to values in the request
     *
     * @param request values to update
     */
    public void updateUserAbout(UserAboutRequest request) {
        UserAboutEntity userAbout;
        var user = getUserEntityByUserNumber(request.getUserNumber());

        var existingUserAbout = userAboutRepository.findByUser(user);
        if (existingUserAbout.isEmpty()) {
            userAbout = new UserAboutEntity();
            userAbout.setUser(user);
        } else {
            userAbout = existingUserAbout
                    .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION_MESSAGE));
        }

        userAbout.setAbout(request.getAbout());
        userAbout.setAvatar(request.getAvatar());
        userAbout.setPublicEmail(request.getPublicEmail());
        userAbout.setDiscord(request.getDiscord());
        userAbout.setFacebook(request.getFacebook());
        userAbout.setTwitter(request.getTwitter());
        userAboutRepository.save(userAbout);
        log.info("Information about user with ID {} has been updated", user.getId());
    }

    /**
     * Returns UserAbout entity values
     *
     * @param userNumber a unique user number
     * @return UserAbout
     */
    public UserAboutResponse getUserAboutInfo(String userNumber) {
        UserAboutEntity userAbout;
        var user = getUserEntityByUserNumber(userNumber);

        var existingUserAbout = userAboutRepository.findByUser(user);
        if (existingUserAbout.isEmpty()) {
            return new UserAboutResponse();
        } else {
            userAbout = existingUserAbout
                    .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_EXCEPTION_MESSAGE));
        }
        return UserAboutResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .about(userAbout.getAbout())
                .avatar(userAbout.getAvatar())
                .publicEmail(userAbout.getPublicEmail())
                .discord(userAbout.getDiscord())
                .facebook(userAbout.getFacebook())
                .twitter(userAbout.getTwitter())
                .build();
    }

    /**
     * Adds a user to the friends list
     *
     * @param request user and friend numbers
     */
    public void addUserFriend(FriendshipRequest request) {
        var friendship = new FriendshipEntity();
        friendship.setFriend(getUserEntityByUserNumber(request.getFriendNumber()));
        friendship.setUser(getUserEntityByUserNumber(request.getUserNumber()));
        friendshipRepository.save(friendship);
        log.info("The user with ID {} added the user with ID {} as a friend",
                friendship.getUser().getId(), friendship.getFriend().getId());
    }

    public List<String> getAllUserFriends(String userNumber) {
        return friendshipRepository
                .findFriendshipEntitiesByUser(getUserEntityByUserNumber(userNumber))
                .stream().map(friendship -> friendship.getFriend().getUserNumber())
                .toList();
    }

    /**
     * Creates a new movie offer
     *
     * @param request without offer number
     * @return offer number
     */
    public String createNewMovieOffer(MovieOfferRequest request) {
        var movieOffer = new MovieOfferEntity();
        movieOffer.setCreator(userRepository.findUserEntityByUserNumber(request.getUserNumber()).orElseThrow());
        movieOffer.setOfferNumber(generateOfferNumber());
        movieOffer.setIsActive(true);
        movieOffer.setIsOpened(true);

        movieOffer.setMovies(createViewedMovieListFromRequest(request));

        movieOfferRepository.save(movieOffer);
        log.info("The new movie offer with ID {} was created by a user with ID {}",
                movieOffer.getId(), movieOffer.getCreator().getId());
        return movieOffer.getOfferNumber();
    }

    /**
     * Updates the offer after a response to it
     *
     * @param request offer request
     */
    public void applyToMovieOffer(MovieOfferRequest request) {
        var updatedMovieOffer = movieOfferRepository
                .findMovieOfferEntityByOfferNumber(request.getOfferNumber()).orElseThrow();
        updatedMovieOffer.setApplicant(userRepository.findUserEntityByUserNumber(request.getUserNumber())
                .orElseThrow());

        var movies = createViewedMovieListFromRequest(request);
        updatedMovieOffer.getMovies().addAll(movies);

        updatedMovieOffer.setStartTime(LocalDateTime.now());
        updatedMovieOffer.setEndTime(LocalDateTime.now().plus(3, ChronoUnit.MINUTES));
        updatedMovieOffer.setIsActive(false);

        movieOfferRepository.save(updatedMovieOffer);
        log.info("User with ID {} replied to the offer with ID {}",
                updatedMovieOffer.getApplicant().getId(), updatedMovieOffer.getId());
    }

    /**
     * Finds the desired offer and creates a response
     *
     * @param offerNumber offer number
     * @return offer response entity
     */
    public MovieOfferResponse getMovieOfferByNumber(String offerNumber) {
        var offer = movieOfferRepository.findMovieOfferEntityByOfferNumber(offerNumber)
                .orElseThrow(() -> new EntityNotFoundException(OFFER_NOT_FOUND_EXCEPTION_MESSAGE));
        return MovieOfferResponse.builder()
                .movies(offer.getMovies().stream()
                        .map(movie ->
                                ViewedMovieResponse.builder()
                                        .movieNumber(movie.getMovieNumber())
                                        .apiLink(movie.getApiLink())
                                        .rating(movie.getRating())
                                        .isViewed(movie.getIsViewed())
                                        .isCreatorMovie(movie.getIsCreatorMovie())
                                        .build()
                        )
                        .toList())
                .offerNumber(offer.getOfferNumber())
                .creator(offer.getCreator().getUserNumber())
                .applicant(offer.getApplicant() != null ? offer.getApplicant().getUserNumber() : "")
                .isActive(offer.getIsActive())
                .isOpened(offer.getIsOpened())
                .startTime(offer.getStartTime())
                .endTime(offer.getEndTime())
                .build();
    }

    /**
     * Finds all active offers and creates a list of response entities
     *
     * @return a list of response entities
     */
    public Page<MovieOfferResponse> getAllActiveMovieOffers(Pageable pageable) {
        var movieOffers = movieOfferRepository.findAllByIsActiveIsTrue();

        var movieOfferResponses = movieOffers.stream()
                .map(movieOffer ->
                        MovieOfferResponse.builder()
                                .offerNumber(movieOffer.getOfferNumber())
                                .creator(movieOffer.getCreator().getUserNumber())
                                .isActive(movieOffer.getIsActive())
                                .isOpened(movieOffer.getIsOpened())
                                .startTime(movieOffer.getStartTime())
                                .endTime(movieOffer.getEndTime())
                                .movies(movieOffer.getMovies().stream()
                                        .map(movie ->
                                                ViewedMovieResponse.builder()
                                                        .movieNumber(movie.getMovieNumber())
                                                        .apiLink(movie.getApiLink())
                                                        .rating(movie.getRating())
                                                        .isViewed(movie.getIsViewed())
                                                        .isCreatorMovie(movie.getIsCreatorMovie())
                                                        .build()
                                        )
                                        .toList())
                                .build()
                )
                .toList();

        int start = Math.toIntExact(pageable.getOffset());
        int end = Math.min((start + pageable.getPageSize()), movieOfferResponses.size());
        return new PageImpl<>(movieOfferResponses.subList(start, end), pageable, movieOfferResponses.size());
    }

    public List<MovieOfferEntity> getAllInactiveMovieOffers() {
        return movieOfferRepository.findAllByIsActiveIsFalse();
    }

    public void updateAllExpiredMovieOffers() {
        var offers = movieOfferRepository.findAllByEndTimeBefore(LocalDateTime.now());
        offers.forEach(movieOffer -> {
            movieOffer.setIsOpened(false);
            movieOfferRepository.save(movieOffer);
        });
    }

    /**
     * Marks the requested movie as watched
     *
     * @param request movie update entity
     */
    public void setViewedMovie(MovieUpdateRequest request) {
        var updatedMovie = viewedMovieRepository
                .findViewedMovieEntityByMovieNumber(request.getMovieNumber()).orElseThrow();
        updatedMovie.setIsViewed(true);
        viewedMovieRepository.save(updatedMovie);
    }

    /**
     * Sets a numeric rating for the requested movie
     *
     * @param request movie update entity
     */
    public void rateViewedMovie(MovieUpdateRequest request) {
        var updatedMovie = viewedMovieRepository
                .findViewedMovieEntityByMovieNumber(request.getMovieNumber()).orElseThrow();
        updatedMovie.setRating(request.getRating());
        viewedMovieRepository.save(updatedMovie);
    }
}

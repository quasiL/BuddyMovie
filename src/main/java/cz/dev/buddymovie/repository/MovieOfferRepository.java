package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.MovieOfferEntity;
import cz.dev.buddymovie.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MovieOfferRepository extends JpaRepository<MovieOfferEntity, Long> {

    Optional<MovieOfferEntity> findMovieOfferEntityByOfferNumber(String number);

    List<MovieOfferEntity> findMovieOfferEntitiesByCreator(UserEntity creator);

    List<MovieOfferEntity> findAllByIsActiveIsTrue();

    List<MovieOfferEntity> findAllByIsActiveIsFalse();

    List<MovieOfferEntity> findAllByEndTimeBefore(LocalDateTime time);
}

package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.ViewedMovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ViewedMovieRepository extends JpaRepository<ViewedMovieEntity, Long> {

    Optional<ViewedMovieEntity> findViewedMovieEntityByMovieNumber(String number);
}

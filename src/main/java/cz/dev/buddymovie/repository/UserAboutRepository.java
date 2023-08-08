package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.UserAboutEntity;
import cz.dev.buddymovie.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAboutRepository extends JpaRepository<UserAboutEntity, Long> {

    Optional<UserAboutEntity> findByUser(UserEntity user);
}

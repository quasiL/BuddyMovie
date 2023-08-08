package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findUserEntityByEmail(String email);

    Optional<UserEntity> findUserEntityByUserNumber(String number);
}

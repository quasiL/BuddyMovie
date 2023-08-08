package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.FriendshipEntity;
import cz.dev.buddymovie.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<FriendshipEntity, Long> {

    List<FriendshipEntity> findFriendshipEntitiesByUser(UserEntity user);

}

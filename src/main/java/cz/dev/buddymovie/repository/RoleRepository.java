package cz.dev.buddymovie.repository;

import cz.dev.buddymovie.entity.Role;
import cz.dev.buddymovie.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    RoleEntity findByRole(Role role);
}

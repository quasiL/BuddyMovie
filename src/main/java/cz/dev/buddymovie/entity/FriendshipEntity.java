package cz.dev.buddymovie.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "friendship")
public class FriendshipEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "friend_id", referencedColumnName = "id", nullable = false)
    private UserEntity friend;
}

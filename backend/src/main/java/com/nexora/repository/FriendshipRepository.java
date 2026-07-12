package com.nexora.repository;

import com.nexora.model.Friendship;
import com.nexora.model.FriendshipStatus;
import com.nexora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    @Query("SELECT f FROM Friendship f WHERE (f.requester = :user1 AND f.receiver = :user2) OR (f.requester = :user2 AND f.receiver = :user1)")
    Optional<Friendship> findRelation(@Param("user1") User user1, @Param("user2") User user2);

    @Query("SELECT f FROM Friendship f WHERE ((f.requester.id = :u1Id AND f.receiver.id = :u2Id) OR (f.requester.id = :u2Id AND f.receiver.id = :u1Id)) AND f.status = 'ACCEPTED'")
    Optional<Friendship> findAcceptedRelation(@Param("u1Id") Long u1Id, @Param("u2Id") Long u2Id);

    List<Friendship> findByReceiverAndStatus(User receiver, FriendshipStatus status);

    @Query("SELECT f FROM Friendship f WHERE (f.requester = :user OR f.receiver = :user) AND f.status = :status")
    List<Friendship> findByUserAndStatus(@Param("user") User user, @Param("status") FriendshipStatus status);
}

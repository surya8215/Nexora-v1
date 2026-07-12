package com.nexora.repository;

import com.nexora.model.Post;
import com.nexora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserInOrderByCreatedAtDesc(Collection<User> users);
    List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);
}

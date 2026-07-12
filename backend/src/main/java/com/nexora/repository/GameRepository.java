package com.nexora.repository;

import com.nexora.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    
    @Query("SELECT g FROM Game g WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(g.name) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:genre IS NULL OR :genre = '' OR LOWER(g.genre) = LOWER(:genre)) AND " +
           "(:platform IS NULL OR :platform = '' OR LOWER(g.platform) = LOWER(:platform))")
    List<Game> searchAndFilter(@Param("search") String search,
                               @Param("genre") String genre,
                               @Param("platform") String platform);

    List<Game> findByUploadedById(Long userId);
}

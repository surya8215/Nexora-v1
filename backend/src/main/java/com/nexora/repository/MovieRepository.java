package com.nexora.repository;

import com.nexora.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    @Query("SELECT m FROM Movie m WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(m.hero) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(m.director) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:genre IS NULL OR :genre = '' OR LOWER(m.genre) = LOWER(:genre)) AND " +
           "(:language IS NULL OR :language = '' OR LOWER(m.language) = LOWER(:language)) AND " +
           "(:ottPlatform IS NULL OR :ottPlatform = '' OR LOWER(m.ottPlatform) = LOWER(:ottPlatform))")
    List<Movie> searchAndFilter(@Param("search") String search,
                                @Param("genre") String genre,
                                @Param("language") String language,
                                @Param("ottPlatform") String ottPlatform);

    List<Movie> findByUploadedById(Long userId);
}

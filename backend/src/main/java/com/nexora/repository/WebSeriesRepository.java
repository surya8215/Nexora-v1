package com.nexora.repository;

import com.nexora.model.WebSeries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface WebSeriesRepository extends JpaRepository<WebSeries, Long> {
    
    @Query("SELECT ws FROM WebSeries ws WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(ws.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(ws.leadCast) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(ws.director) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:genre IS NULL OR :genre = '' OR LOWER(ws.genre) = LOWER(:genre)) AND " +
           "(:language IS NULL OR :language = '' OR LOWER(ws.language) = LOWER(:language)) AND " +
           "(:ottPlatform IS NULL OR :ottPlatform = '' OR LOWER(ws.ottPlatform) = LOWER(:ottPlatform))")
    List<WebSeries> searchAndFilter(@Param("search") String search,
                                    @Param("genre") String genre,
                                    @Param("language") String language,
                                    @Param("ottPlatform") String ottPlatform);

    List<WebSeries> findByUploadedById(Long userId);
}

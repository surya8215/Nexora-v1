package com.nexora.repository;

import com.nexora.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    
    @Query("SELECT p FROM Place p WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.location) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:maxPrice IS NULL OR p.entryPrice <= :maxPrice) AND " +
           "(:maxDistance IS NULL OR p.distanceKm <= :maxDistance)")
    List<Place> searchAndFilter(@Param("search") String search,
                                @Param("maxPrice") Double maxPrice,
                                @Param("maxDistance") Double maxDistance);

    List<Place> findByUploadedById(Long userId);
}

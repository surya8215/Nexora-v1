package com.nexora.repository;

import com.nexora.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.location) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.specialItems) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:priceRange IS NULL OR :priceRange = '' OR r.priceRange = :priceRange)")
    List<Restaurant> searchAndFilter(@Param("search") String search,
                                     @Param("priceRange") String priceRange);

    List<Restaurant> findByUploadedById(Long userId);
}

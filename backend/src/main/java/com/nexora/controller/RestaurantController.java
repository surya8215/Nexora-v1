package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.model.Restaurant;
import com.nexora.service.DiscoveryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {

    @Autowired
    private DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<?> uploadRestaurant(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("specialItems") String specialItems,
            @RequestParam("priceRange") String priceRange,
            @RequestParam("contentType") String contentType,
            @RequestParam(value = "menu", required = false) MultipartFile[] menu) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Restaurant r = discoveryService.uploadRestaurant(
                    userId, name, location, specialItems, priceRange, contentType, menu
            );
            return ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getRestaurants(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "priceRange", required = false) String priceRange) {
        try {
            List<Restaurant> list = discoveryService.searchRestaurants(search, priceRange);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeRestaurant(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Restaurant r = discoveryService.likeRestaurant(userId, id);
            return ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> commentRestaurant(
            HttpServletRequest request,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Restaurant r = discoveryService.commentRestaurant(userId, id, commentRequest.getText());
            return ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRestaurant(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            discoveryService.deleteRestaurant(userId, id);
            return ResponseEntity.ok("Restaurant deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<?> getUploadedBy(@PathVariable Long userId) {
        try {
            List<Restaurant> list = discoveryService.getRestaurantsByUploadedBy(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

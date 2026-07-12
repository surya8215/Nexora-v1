package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.model.Place;
import com.nexora.service.DiscoveryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/places")
public class PlaceController {

    @Autowired
    private DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<?> uploadPlace(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("entryPrice") Double entryPrice,
            @RequestParam("distanceKm") Double distanceKm,
            @RequestParam("details") String details,
            @RequestParam("contentType") String contentType,
            @RequestParam(value = "photo", required = false) MultipartFile[] photo) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Place place = discoveryService.uploadPlace(
                    userId, name, location, entryPrice, distanceKm, details, contentType, photo
            );
            return ResponseEntity.ok(place);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getPlaces(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice,
            @RequestParam(value = "maxDistance", required = false) Double maxDistance) {
        try {
            List<Place> list = discoveryService.searchPlaces(search, maxPrice, maxDistance);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePlace(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Place place = discoveryService.likePlace(userId, id);
            return ResponseEntity.ok(place);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> commentPlace(
            HttpServletRequest request,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Place place = discoveryService.commentPlace(userId, id, commentRequest.getText());
            return ResponseEntity.ok(place);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlace(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            discoveryService.deletePlace(userId, id);
            return ResponseEntity.ok("Place deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<?> getUploadedBy(@PathVariable Long userId) {
        try {
            List<Place> list = discoveryService.getPlacesByUploadedBy(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

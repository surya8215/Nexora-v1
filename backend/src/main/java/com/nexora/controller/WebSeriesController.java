package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.model.WebSeries;
import com.nexora.service.DiscoveryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/webseries")
public class WebSeriesController {

    @Autowired
    private DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<?> uploadWebSeries(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("genre") String genre,
            @RequestParam("language") String language,
            @RequestParam("ottPlatform") String ottPlatform,
            @RequestParam(value = "director", required = false) String director,
            @RequestParam(value = "leadCast", required = false) String leadCast,
            @RequestParam(value = "seasons", required = false) Integer seasons,
            @RequestParam(value = "releaseDate", required = false) String releaseDate,
            @RequestParam("contentType") String contentType,
            @RequestParam(value = "posterUrl", required = false) String posterUrl,
            @RequestParam(value = "rating", required = false) Double rating,
            @RequestParam(value = "poster", required = false) MultipartFile poster) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            System.out.println("[WebSeriesController] uploadWebSeries called. name=" + name + ", genre=" + genre + ", ottPlatform=" + ottPlatform + ", posterUrl=" + posterUrl + ", rating=" + rating);
            WebSeries ws = discoveryService.uploadWebSeries(
                    userId, name, genre, language, ottPlatform, director, leadCast, seasons, releaseDate, contentType, poster, posterUrl, rating
            );
            return ResponseEntity.ok(ws);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getWebSeries(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "language", required = false) String language,
            @RequestParam(value = "ottPlatform", required = false) String ottPlatform) {
        try {
            List<WebSeries> list = discoveryService.searchWebSeries(search, genre, language, ottPlatform);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeWebSeries(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            WebSeries ws = discoveryService.likeWebSeries(userId, id);
            return ResponseEntity.ok(ws);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> commentWebSeries(
            HttpServletRequest request,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            WebSeries ws = discoveryService.commentWebSeries(userId, id, commentRequest.getText());
            return ResponseEntity.ok(ws);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWebSeries(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            discoveryService.deleteWebSeries(userId, id);
            return ResponseEntity.ok("Web Series deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<?> getUploadedBy(@PathVariable Long userId) {
        try {
            List<WebSeries> list = discoveryService.getWebSeriesByUploadedBy(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

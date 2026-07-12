package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.model.Movie;
import com.nexora.service.DiscoveryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    private DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<?> uploadMovie(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("genre") String genre,
            @RequestParam("language") String language,
            @RequestParam("ottPlatform") String ottPlatform,
            @RequestParam("director") String director,
            @RequestParam(value = "hero", required = false) String hero,
            @RequestParam(value = "heroine", required = false) String heroine,
            @RequestParam(value = "releaseDate", required = false) String releaseDate,
            @RequestParam("contentType") String contentType,
            @RequestParam(value = "posterUrl", required = false) String posterUrl,
            @RequestParam(value = "rating", required = false) Double rating,
            @RequestParam(value = "poster", required = false) MultipartFile poster) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            System.out.println("[MovieController] uploadMovie called. name=" + name + ", genre=" + genre + ", ottPlatform=" + ottPlatform + ", posterUrl=" + posterUrl + ", rating=" + rating);
            Movie movie = discoveryService.uploadMovie(
                    userId, name, genre, language, ottPlatform, director, hero, heroine, releaseDate, contentType, poster, posterUrl, rating
            );
            return ResponseEntity.ok(movie);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMovies(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "language", required = false) String language,
            @RequestParam(value = "ottPlatform", required = false) String ottPlatform) {
        try {
            List<Movie> list = discoveryService.searchMovies(search, genre, language, ottPlatform);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeMovie(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Movie movie = discoveryService.likeMovie(userId, id);
            return ResponseEntity.ok(movie);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> commentMovie(
            HttpServletRequest request,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Movie movie = discoveryService.commentMovie(userId, id, commentRequest.getText());
            return ResponseEntity.ok(movie);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            discoveryService.deleteMovie(userId, id);
            return ResponseEntity.ok("Movie deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<?> getUploadedBy(@PathVariable Long userId) {
        try {
            List<Movie> list = discoveryService.getMoviesByUploadedBy(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

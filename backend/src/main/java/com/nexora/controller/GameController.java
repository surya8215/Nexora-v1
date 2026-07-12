package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.model.Game;
import com.nexora.service.DiscoveryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/games")
public class GameController {

    @Autowired
    private DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<?> uploadGame(
            HttpServletRequest request,
            @RequestParam("name") String name,
            @RequestParam("genre") String genre,
            @RequestParam("platform") String platform,
            @RequestParam("contentType") String contentType,
            @RequestParam(value = "coverUrl", required = false) String coverUrl,
            @RequestParam(value = "cover", required = false) MultipartFile cover) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Game game = discoveryService.uploadGame(userId, name, genre, platform, contentType, cover, coverUrl);
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getGames(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "platform", required = false) String platform) {
        try {
            List<Game> list = discoveryService.searchGames(search, genre, platform);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeGame(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Game game = discoveryService.likeGame(userId, id);
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> commentGame(
            HttpServletRequest request,
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Game game = discoveryService.commentGame(userId, id, commentRequest.getText());
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGame(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            discoveryService.deleteGame(userId, id);
            return ResponseEntity.ok("Game deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/uploaded-by/{userId}")
    public ResponseEntity<?> getUploadedBy(@PathVariable Long userId) {
        try {
            List<Game> list = discoveryService.getGamesByUploadedBy(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

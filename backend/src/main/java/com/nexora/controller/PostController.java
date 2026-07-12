package com.nexora.controller;

import com.nexora.dto.CommentRequest;
import com.nexora.dto.PostDto;
import com.nexora.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(
            HttpServletRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("caption") String caption) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.createPost(userId, caption, image);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<PostDto> feed = postService.getFeed(userId);
            return ResponseEntity.ok(feed);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(HttpServletRequest request, @PathVariable Long postId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.likePost(userId, postId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{postId}/comment")
    public ResponseEntity<?> commentPost(
            HttpServletRequest request,
            @PathVariable Long postId,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.commentPost(userId, postId, commentRequest.getText());
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPosts(HttpServletRequest request, @PathVariable Long userId) {
        Long viewerId = (Long) request.getAttribute("userId");
        if (viewerId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<PostDto> posts = postService.getUserPosts(userId, viewerId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(HttpServletRequest request, @PathVariable Long postId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            postService.deletePost(userId, postId);
            return ResponseEntity.ok("Post deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(
            HttpServletRequest request,
            @PathVariable Long postId,
            @RequestParam(value = "caption", required = false) String caption,
            @RequestParam(value = "deleteImage", required = false, defaultValue = "false") boolean deleteImage,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.updatePost(userId, postId, caption, deleteImage, image);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<?> editComment(
            HttpServletRequest request,
            @PathVariable Long postId,
            @PathVariable String commentId,
            @Valid @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.editComment(userId, postId, commentId, commentRequest.getText());
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(
            HttpServletRequest request,
            @PathVariable Long postId,
            @PathVariable String commentId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            PostDto post = postService.deleteComment(userId, postId, commentId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

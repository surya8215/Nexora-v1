package com.nexora.controller;

import com.nexora.dto.UserDto;
import com.nexora.model.Friendship;
import com.nexora.service.FriendshipService;
import com.nexora.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/friendships")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserService userService;

    @PostMapping("/request/{receiverId}")
    public ResponseEntity<?> sendRequest(HttpServletRequest request, @PathVariable Long receiverId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            Friendship friendship = friendshipService.sendRequest(userId, receiverId);
            return ResponseEntity.ok("Friend request sent successfully. Status: " + friendship.getStatus());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/accept/{requesterId}")
    public ResponseEntity<?> acceptRequest(HttpServletRequest request, @PathVariable Long requesterId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            friendshipService.acceptRequest(userId, requesterId);
            return ResponseEntity.ok("Friend request accepted.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/decline/{requesterId}")
    public ResponseEntity<?> declineRequest(HttpServletRequest request, @PathVariable Long requesterId) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            friendshipService.declineRequest(userId, requesterId);
            return ResponseEntity.ok("Friend request declined.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getFriends(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<UserDto> friends = friendshipService.getActiveFriends(userId);
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPending(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<UserDto> pending = friendshipService.getPendingRequests(userId);
            return ResponseEntity.ok(pending);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(HttpServletRequest request, @RequestParam String query) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            List<UserDto> results = userService.searchUsers(query);
            // Filter out the current user themselves from search results
            List<UserDto> filtered = results.stream()
                    .filter(u -> !u.getId().equals(userId))
                    .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(filtered);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

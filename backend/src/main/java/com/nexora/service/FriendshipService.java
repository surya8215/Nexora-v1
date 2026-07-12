package com.nexora.service;

import com.nexora.dto.UserDto;
import com.nexora.model.Friendship;
import com.nexora.model.FriendshipStatus;
import com.nexora.model.User;
import com.nexora.repository.FriendshipRepository;
import com.nexora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Friendship sendRequest(Long requesterId, Long receiverId) {
        if (requesterId.equals(receiverId)) {
            throw new RuntimeException("You cannot send a friend request to yourself.");
        }

        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found."));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found."));

        Optional<Friendship> existing = friendshipRepository.findRelation(requester, receiver);
        if (existing.isPresent()) {
            Friendship f = existing.get();
            if (f.getStatus() == FriendshipStatus.ACCEPTED) {
                throw new RuntimeException("You are already friends.");
            } else if (f.getStatus() == FriendshipStatus.PENDING) {
                throw new RuntimeException("A friend request is already pending.");
            } else {
                // If DECLINED, reset to PENDING and update requester
                f.setRequester(requester);
                f.setReceiver(receiver);
                f.setStatus(FriendshipStatus.PENDING);
                f.setCreatedAt(LocalDateTime.now());
                f.setRespondedAt(null);
                return friendshipRepository.save(f);
            }
        }

        Friendship friendship = new Friendship(requester, receiver, FriendshipStatus.PENDING);
        return friendshipRepository.save(friendship);
    }

    public Friendship acceptRequest(Long receiverId, Long requesterId) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found."));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found."));

        Friendship friendship = friendshipRepository.findRelation(requester, receiver)
                .orElseThrow(() -> new RuntimeException("Friend request not found."));

        if (!friendship.getReceiver().getId().equals(receiverId)) {
            throw new RuntimeException("You can only accept requests sent to you.");
        }

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new RuntimeException("Request is not in pending state.");
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendship.setRespondedAt(LocalDateTime.now());
        return friendshipRepository.save(friendship);
    }

    public Friendship declineRequest(Long receiverId, Long requesterId) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found."));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found."));

        Friendship friendship = friendshipRepository.findRelation(requester, receiver)
                .orElseThrow(() -> new RuntimeException("Friend request not found."));

        if (!friendship.getReceiver().getId().equals(receiverId)) {
            throw new RuntimeException("You can only decline requests sent to you.");
        }

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new RuntimeException("Request is not in pending state.");
        }

        friendship.setStatus(FriendshipStatus.DECLINED);
        friendship.setRespondedAt(LocalDateTime.now());
        return friendshipRepository.save(friendship);
    }

    public List<UserDto> getActiveFriends(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        List<Friendship> relations = friendshipRepository.findByUserAndStatus(user, FriendshipStatus.ACCEPTED);
        List<UserDto> friends = new ArrayList<>();

        for (Friendship f : relations) {
            if (f.getRequester().getId().equals(userId)) {
                friends.add(new UserDto(f.getReceiver()).sanitizeForOtherUser());
            } else {
                friends.add(new UserDto(f.getRequester()).sanitizeForOtherUser());
            }
        }
        return friends;
    }

    public List<UserDto> getPendingRequests(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        return friendshipRepository.findByReceiverAndStatus(user, FriendshipStatus.PENDING).stream()
                .map(f -> new UserDto(f.getRequester()).sanitizeForOtherUser())
                .collect(Collectors.toList());
    }

    public boolean areFriends(Long u1Id, Long u2Id) {
        if (u1Id.equals(u2Id)) return true;
        return friendshipRepository.findAcceptedRelation(u1Id, u2Id).isPresent();
    }
}

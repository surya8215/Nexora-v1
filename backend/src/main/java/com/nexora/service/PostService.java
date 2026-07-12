package com.nexora.service;

import com.nexora.dto.PostDto;
import com.nexora.model.Post;
import com.nexora.model.User;
import com.nexora.repository.PostRepository;
import com.nexora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private FileStorageService fileStorageService;

    public PostDto createPost(Long userId, String caption, MultipartFile imageFile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = fileStorageService.storeFile(imageFile);
        }

        Post post = new Post(user, imageUrl, caption);
        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }

    public List<PostDto> getFeed(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // Get user's active friends
        List<User> list = friendshipService.getActiveFriends(userId).stream()
                .map(dto -> userRepository.findById(dto.getId()).orElse(null))
                .filter(u -> u != null)
                .collect(Collectors.toList());

        // Include user themselves in the feed
        list.add(user);

        return postRepository.findByUserInOrderByCreatedAtDesc(list).stream()
                .map(post -> new PostDto(post, userId))
                .collect(Collectors.toList());
    }

    public PostDto likePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        // Gating check: Must be the owner or friends with the owner
        if (!friendshipService.areFriends(userId, post.getUser().getId())) {
            throw new RuntimeException("Access denied: You are not friends with the poster.");
        }

        if (post.getLikedByUserIds().contains(userId)) {
            post.getLikedByUserIds().remove(userId); // Unlike
        } else {
            post.getLikedByUserIds().add(userId); // Like
        }

        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }

    public PostDto commentPost(Long userId, Long postId, String commentText) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        // Gating check: Must be the owner or friends with the owner
        if (!friendshipService.areFriends(userId, post.getUser().getId())) {
            throw new RuntimeException("Access denied: You are not friends with the poster.");
        }

        String fullName = user.getFirstName() + " " + user.getLastName();
        Post.PostComment comment = new Post.PostComment(userId, fullName, commentText);
        post.getComments().add(comment);

        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }

    public List<PostDto> getUserPosts(Long userId, Long viewerId) {
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(post -> new PostDto(post, viewerId))
                .collect(Collectors.toList());
    }

    public void deletePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied: You can only delete your own posts.");
        }
        postRepository.delete(post);
    }

    public PostDto updatePost(Long userId, Long postId, String caption, boolean deleteImage, MultipartFile imageFile) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied: You can only edit your own posts.");
        }
        post.setCaption(caption);
        if (deleteImage) {
            post.setImageUrl(null);
        } else if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(imageFile);
            post.setImageUrl(imageUrl);
        }
        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }

    public PostDto editComment(Long userId, Long postId, String commentId, String newText) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        Post.PostComment targetComment = null;
        for (Post.PostComment comment : post.getComments()) {
            if (commentId.equals(comment.getId())) {
                targetComment = comment;
                break;
            }
        }

        if (targetComment == null) {
            throw new RuntimeException("Comment not found.");
        }

        if (!targetComment.getUserId().equals(userId)) {
            throw new RuntimeException("Access denied: You can only edit your own comments.");
        }

        targetComment.setText(newText);
        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }

    public PostDto deleteComment(Long userId, Long postId, String commentId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        Post.PostComment targetComment = null;
        for (Post.PostComment comment : post.getComments()) {
            if (commentId.equals(comment.getId())) {
                targetComment = comment;
                break;
            }
        }

        if (targetComment == null) {
            throw new RuntimeException("Comment not found.");
        }

        if (!targetComment.getUserId().equals(userId) && !post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied: You are not authorized to delete this comment.");
        }

        post.getComments().remove(targetComment);
        Post saved = postRepository.save(post);
        return new PostDto(saved, userId);
    }
}

package com.nexora.dto;

import com.nexora.model.Post;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    private Long id;
    private UserDto user;
    private String imageUrl;
    private String caption;
    private LocalDateTime createdAt;
    private int likesCount;
    private boolean likedByCurrentUser;
    private List<Post.PostComment> comments;

    public PostDto() {
    }

    public PostDto(Post post, Long currentUserId) {
        this.id = post.getId();
        this.user = new UserDto(post.getUser()).sanitizeForOtherUser(currentUserId);
        this.imageUrl = post.getImageUrl();
        this.caption = post.getCaption();
        this.createdAt = post.getCreatedAt();
        this.likesCount = post.getLikedByUserIds().size();
        this.likedByCurrentUser = post.getLikedByUserIds().contains(currentUserId);
        this.comments = post.getComments();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public int getLikesCount() { return likesCount; }
    public void setLikesCount(int likesCount) { this.likesCount = likesCount; }

    public boolean isLikedByCurrentUser() { return likedByCurrentUser; }
    public void setLikedByCurrentUser(boolean likedByCurrentUser) { this.likedByCurrentUser = likedByCurrentUser; }

    public List<Post.PostComment> getComments() { return comments; }
    public void setComments(List<Post.PostComment> comments) { this.comments = comments; }
}

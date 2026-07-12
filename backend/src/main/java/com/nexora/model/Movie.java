package com.nexora.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String language;

    @Column(name = "ott_platform", nullable = false)
    private String ottPlatform;

    @Column(nullable = false)
    private String director;

    @Column(nullable = true)
    private String hero;

    @Column(nullable = true)
    private String heroine;

    @Column(name = "poster_url", columnDefinition = "TEXT")
    private String posterUrl;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(nullable = true)
    private Double rating;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_likes", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "user_id")
    private Set<Long> likedByUserIds = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_comments", joinColumns = @JoinColumn(name = "movie_id"))
    private List<MovieComment> comments = new ArrayList<>();

    public Movie() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getOttPlatform() { return ottPlatform; }
    public void setOttPlatform(String ottPlatform) { this.ottPlatform = ottPlatform; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public String getHero() { return hero; }
    public void setHero(String hero) { this.hero = hero; }

    public String getHeroine() { return heroine; }
    public void setHeroine(String heroine) { this.heroine = heroine; }

    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }

    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Set<Long> getLikedByUserIds() { return likedByUserIds; }
    public void setLikedByUserIds(Set<Long> likedByUserIds) { this.likedByUserIds = likedByUserIds; }

    public List<MovieComment> getComments() { return comments; }
    public void setComments(List<MovieComment> comments) { this.comments = comments; }

    @Embeddable
    public static class MovieComment {
        @Column(name = "user_id", nullable = false)
        private Long userId;

        @Column(name = "user_name", nullable = false)
        private String userName;

        @Column(nullable = false, columnDefinition = "TEXT")
        private String text;

        @Column(name = "created_at", nullable = false)
        private LocalDateTime createdAt;

        public MovieComment() {
        }

        public MovieComment(Long userId, String userName, String text) {
            this.userId = userId;
            this.userName = userName;
            this.text = text;
            this.createdAt = LocalDateTime.now();
        }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}

package com.nexora.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pending_users")
public class PendingUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "verification_token", nullable = false, unique = true)
    private String verificationToken;

    @Column(name = "fav_movie_genre")
    private String favMovieGenre;

    @Column(name = "fav_place_type")
    private String favPlaceType;

    @Column(name = "fav_series_genre")
    private String favSeriesGenre;

    @Column(name = "fav_game_type")
    private String favGameType;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public PendingUser() {
    }

    public PendingUser(String firstName, String lastName, String email, String mobileNumber, String favMovieGenre, String favPlaceType, String favSeriesGenre, String favGameType, String verificationToken) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.favMovieGenre = favMovieGenre;
        this.favPlaceType = favPlaceType;
        this.favSeriesGenre = favSeriesGenre;
        this.favGameType = favGameType;
        this.verificationToken = verificationToken;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }

    public String getFavMovieGenre() { return favMovieGenre; }
    public void setFavMovieGenre(String favMovieGenre) { this.favMovieGenre = favMovieGenre; }

    public String getFavPlaceType() { return favPlaceType; }
    public void setFavPlaceType(String favPlaceType) { this.favPlaceType = favPlaceType; }

    public String getFavSeriesGenre() { return favSeriesGenre; }
    public void setFavSeriesGenre(String favSeriesGenre) { this.favSeriesGenre = favSeriesGenre; }

    public String getFavGameType() { return favGameType; }
    public void setFavGameType(String favGameType) { this.favGameType = favGameType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
}

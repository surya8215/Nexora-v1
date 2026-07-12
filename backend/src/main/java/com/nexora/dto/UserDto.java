package com.nexora.dto;

import com.nexora.model.User;
import com.nexora.model.PendingUser;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String favMovieGenre;
    private String favPlaceType;
    private String favSeriesGenre;
    private String favGameType;
    private String mobileNumber;
    private String role;
    private String profilePicture;

    public UserDto() {
    }

    public UserDto(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.mobileNumber = user.getMobileNumber();
        this.role = user.getRole();
        this.favMovieGenre = user.getFavMovieGenre();
        this.favPlaceType = user.getFavPlaceType();
        this.favSeriesGenre = user.getFavSeriesGenre();
        this.favGameType = user.getFavGameType();
        this.profilePicture = user.getProfilePicture();
    }

    public UserDto(PendingUser user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.mobileNumber = user.getMobileNumber();
        this.favMovieGenre = user.getFavMovieGenre();
        this.favPlaceType = user.getFavPlaceType();
        this.favSeriesGenre = user.getFavSeriesGenre();
        this.favGameType = user.getFavGameType();
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

    public String getFavMovieGenre() { return favMovieGenre; }
    public void setFavMovieGenre(String favMovieGenre) { this.favMovieGenre = favMovieGenre; }

    public String getFavPlaceType() { return favPlaceType; }
    public void setFavPlaceType(String favPlaceType) { this.favPlaceType = favPlaceType; }

    public String getFavSeriesGenre() { return favSeriesGenre; }
    public void setFavSeriesGenre(String favSeriesGenre) { this.favSeriesGenre = favSeriesGenre; }

    public String getFavGameType() { return favGameType; }
    public void setFavGameType(String favGameType) { this.favGameType = favGameType; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }

    public UserDto sanitizeForOtherUser(Long authenticatedUserId) {
        if (authenticatedUserId == null || !authenticatedUserId.equals(this.id)) {
            this.email = null;
            this.mobileNumber = null;
        }
        return this;
    }

    public UserDto sanitizeForOtherUser() {
        this.email = null;
        this.mobileNumber = null;
        return this;
    }
}

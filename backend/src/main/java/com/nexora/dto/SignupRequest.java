package com.nexora.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SignupRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String favMovieGenre;
    private String favPlaceType;
    private String favSeriesGenre;
    private String favGameType;
    private String mobileNumber;

    public SignupRequest() {
    }

    // Getters and Setters
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
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
}

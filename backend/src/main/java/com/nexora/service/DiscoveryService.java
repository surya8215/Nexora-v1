package com.nexora.service;

import com.nexora.model.*;
import com.nexora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;

@Service
public class DiscoveryService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private WebSeriesRepository webSeriesRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    // --- CATEGORY GUARD ---
    private void validateCategory(String expected, String selected) {
        if (selected == null || !expected.equalsIgnoreCase(selected.trim())) {
            throw new RuntimeException("Category mismatch! You selected '" + selected 
                + "', but this form is strictly for '" + expected 
                + "' uploads. Please open the appropriate upload form.");
        }
    }

    // ==========================================
    // MOVIES MODULE
    // ==========================================
    public Movie uploadMovie(Long userId, String name, String genre, String language,
                              String ottPlatform, String director, String hero, String heroine,
                              String releaseDateStr, String contentType, MultipartFile posterFile, String externalPosterUrl, Double rating) {
        
        System.out.println("[DiscoveryService.uploadMovie] ENTRY");
        System.out.println("  posterFile null? " + (posterFile == null));
        System.out.println("  posterFile empty? " + (posterFile != null ? posterFile.isEmpty() : "N/A"));
        System.out.println("  externalPosterUrl = " + externalPosterUrl);
        System.out.println("  rating = " + rating);

        validateCategory("Movie", contentType);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        String posterUrl = null;
        if (posterFile != null && !posterFile.isEmpty()) {
            posterUrl = fileStorageService.storeFile(posterFile);
            System.out.println("  posterUrl from FILE UPLOAD = " + posterUrl);
        } else if (externalPosterUrl != null && !externalPosterUrl.trim().isEmpty()) {
            posterUrl = externalPosterUrl;
            System.out.println("  posterUrl from EXTERNAL URL = " + posterUrl);
        } else {
            System.out.println("  posterUrl is NULL — no file uploaded, no external URL provided");
        }

        Movie movie = new Movie();
        movie.setUploadedBy(user);
        movie.setName(name);
        movie.setGenre(genre);
        movie.setLanguage(language);
        movie.setOttPlatform(ottPlatform);
        movie.setDirector(director);
        movie.setHero(hero != null && !hero.trim().isEmpty() ? hero : null);
        movie.setHeroine(heroine != null && !heroine.trim().isEmpty() ? heroine : null);
        movie.setPosterUrl(posterUrl);
        movie.setRating(rating);
        
        if (releaseDateStr != null && !releaseDateStr.trim().isEmpty()) {
            movie.setReleaseDate(LocalDate.parse(releaseDateStr));
        } else {
            movie.setReleaseDate(null);
        }

        System.out.println("  SAVING movie: name=" + movie.getName() + ", posterUrl=" + movie.getPosterUrl() + ", rating=" + movie.getRating());
        Movie saved = movieRepository.save(movie);
        System.out.println("  SAVED  movie id=" + saved.getId() + ", posterUrl=" + saved.getPosterUrl());
        return saved;
    }

    public List<Movie> searchMovies(String search, String genre, String language, String ottPlatform) {
        return movieRepository.searchAndFilter(search, genre, language, ottPlatform);
    }

    public Movie likeMovie(Long userId, Long movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));
        if (movie.getLikedByUserIds().contains(userId)) {
            movie.getLikedByUserIds().remove(userId);
        } else {
            movie.getLikedByUserIds().add(userId);
        }
        return movieRepository.save(movie);
    }

    public Movie commentMovie(Long userId, Long movieId, String text) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));

        String fullName = user.getFirstName() + " " + user.getLastName();
        Movie.MovieComment comment = new Movie.MovieComment(userId, fullName, text);
        movie.getComments().add(comment);
        return movieRepository.save(movie);
    }

    private void ensureAdmin(User user) {
        if (user == null || user.getRole() == null || !user.getRole().equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Access denied: only admin can delete entries.");
        }
    }

    public void deleteMovie(Long userId, Long movieId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ensureAdmin(user);
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));
        movieRepository.delete(movie);
    }

    // ==========================================
    // WEB SERIES MODULE
    // ==========================================
    public WebSeries uploadWebSeries(Long userId, String name, String genre, String language,
                                      String ottPlatform, String director, String leadCast,
                                      Integer seasons, String releaseDateStr, String contentType, MultipartFile posterFile, String externalPosterUrl, Double rating) {
        
        validateCategory("Web Series", contentType);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        String posterUrl = null;
        if (posterFile != null && !posterFile.isEmpty()) {
            posterUrl = fileStorageService.storeFile(posterFile);
        } else if (externalPosterUrl != null && !externalPosterUrl.trim().isEmpty()) {
            posterUrl = externalPosterUrl;
        }

        WebSeries ws = new WebSeries();
        ws.setUploadedBy(user);
        ws.setName(name);
        ws.setGenre(genre);
        ws.setLanguage(language);
        ws.setOttPlatform(ottPlatform);
        ws.setDirector(director != null && !director.trim().isEmpty() ? director : null);
        ws.setLeadCast(leadCast != null && !leadCast.trim().isEmpty() ? leadCast : null);
        ws.setSeasons(seasons);
        ws.setPosterUrl(posterUrl);
        ws.setRating(rating);

        if (releaseDateStr != null && !releaseDateStr.trim().isEmpty()) {
            ws.setReleaseDate(LocalDate.parse(releaseDateStr));
        } else {
            ws.setReleaseDate(null);
        }

        return webSeriesRepository.save(ws);
    }

    public List<WebSeries> searchWebSeries(String search, String genre, String language, String ottPlatform) {
        return webSeriesRepository.searchAndFilter(search, genre, language, ottPlatform);
    }

    public WebSeries likeWebSeries(Long userId, Long wsId) {
        WebSeries ws = webSeriesRepository.findById(wsId).orElseThrow(() -> new RuntimeException("Web Series not found"));
        if (ws.getLikedByUserIds().contains(userId)) {
            ws.getLikedByUserIds().remove(userId);
        } else {
            ws.getLikedByUserIds().add(userId);
        }
        return webSeriesRepository.save(ws);
    }

    public WebSeries commentWebSeries(Long userId, Long wsId, String text) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        WebSeries ws = webSeriesRepository.findById(wsId).orElseThrow(() -> new RuntimeException("Web Series not found"));

        String fullName = user.getFirstName() + " " + user.getLastName();
        WebSeries.WebSeriesComment comment = new WebSeries.WebSeriesComment(userId, fullName, text);
        ws.getComments().add(comment);
        return webSeriesRepository.save(ws);
    }

    public void deleteWebSeries(Long userId, Long wsId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ensureAdmin(user);
        WebSeries ws = webSeriesRepository.findById(wsId).orElseThrow(() -> new RuntimeException("Web Series not found"));
        webSeriesRepository.delete(ws);
    }

    // ==========================================
    // GAMES MODULE
    // ==========================================
    public Game uploadGame(Long userId, String name, String genre, String platform,
                            String contentType, MultipartFile coverFile, String externalCoverUrl) {
        
        validateCategory("Game", contentType);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        String coverUrl = null;
        if (coverFile != null && !coverFile.isEmpty()) {
            coverUrl = fileStorageService.storeFile(coverFile);
        } else if (externalCoverUrl != null && !externalCoverUrl.trim().isEmpty()) {
            coverUrl = externalCoverUrl;
        }

        Game game = new Game();
        game.setUploadedBy(user);
        game.setName(name);
        game.setGenre(genre);
        game.setPlatform(platform);
        game.setCoverUrl(coverUrl);

        return gameRepository.save(game);
    }

    public List<Game> searchGames(String search, String genre, String platform) {
        return gameRepository.searchAndFilter(search, genre, platform);
    }

    public Game likeGame(Long userId, Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        if (game.getLikedByUserIds().contains(userId)) {
            game.getLikedByUserIds().remove(userId);
        } else {
            game.getLikedByUserIds().add(userId);
        }
        return gameRepository.save(game);
    }

    public Game commentGame(Long userId, Long gameId, String text) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        String fullName = user.getFirstName() + " " + user.getLastName();
        Game.GameComment comment = new Game.GameComment(userId, fullName, text);
        game.getComments().add(comment);
        return gameRepository.save(game);
    }

    public void deleteGame(Long userId, Long gameId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ensureAdmin(user);
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));
        gameRepository.delete(game);
    }

    // ==========================================
    // PLACES MODULE
    // ==========================================
    public Place uploadPlace(Long userId, String name, String location, Double entryPrice,
                              Double distanceKm, String details, String contentType, MultipartFile[] photoFiles) {
        
        validateCategory("Place", contentType);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        StringBuilder photoUrls = new StringBuilder();
        if (photoFiles != null && photoFiles.length > 0) {
            for (MultipartFile photoFile : photoFiles) {
                if (photoFile != null && !photoFile.isEmpty()) {
                    String url = fileStorageService.storeFile(photoFile);
                    if (photoUrls.length() > 0) photoUrls.append(",");
                    photoUrls.append(url);
                }
            }
        }

        Place place = new Place();
        place.setUploadedBy(user);
        place.setName(name);
        place.setLocation(location);
        place.setEntryPrice(entryPrice);
        place.setDistanceKm(distanceKm);
        place.setDetails(details);
        place.setPhotoUrl(photoUrls.length() > 0 ? photoUrls.toString() : null);

        return placeRepository.save(place);
    }

    public List<Place> searchPlaces(String search, Double maxPrice, Double maxDistance) {
        return placeRepository.searchAndFilter(search, maxPrice, maxDistance);
    }

    public Place likePlace(Long userId, Long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new RuntimeException("Place not found"));
        if (place.getLikedByUserIds().contains(userId)) {
            place.getLikedByUserIds().remove(userId);
        } else {
            place.getLikedByUserIds().add(userId);
        }
        return placeRepository.save(place);
    }

    public Place commentPlace(Long userId, Long placeId, String text) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new RuntimeException("Place not found"));

        String fullName = user.getFirstName() + " " + user.getLastName();
        Place.PlaceComment comment = new Place.PlaceComment(userId, fullName, text);
        place.getComments().add(comment);
        return placeRepository.save(place);
    }

    public void deletePlace(Long userId, Long placeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ensureAdmin(user);
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new RuntimeException("Place not found"));
        placeRepository.delete(place);
    }

    // ==========================================
    // RESTAURANTS MODULE
    // ==========================================
    public Restaurant uploadRestaurant(Long userId, String name, String location, String specialItems,
                                        String priceRange, String contentType, MultipartFile[] menuFiles) {
        
        validateCategory("Restaurant", contentType);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        StringBuilder menuImageUrls = new StringBuilder();
        if (menuFiles != null && menuFiles.length > 0) {
            for (MultipartFile menuFile : menuFiles) {
                if (menuFile != null && !menuFile.isEmpty()) {
                    String url = fileStorageService.storeFile(menuFile);
                    if (menuImageUrls.length() > 0) menuImageUrls.append(",");
                    menuImageUrls.append(url);
                }
            }
        }

        Restaurant r = new Restaurant();
        r.setUploadedBy(user);
        r.setName(name);
        r.setLocation(location);
        r.setSpecialItems(specialItems);
        r.setPriceRange(priceRange);
        r.setMenuImageUrl(menuImageUrls.length() > 0 ? menuImageUrls.toString() : null);

        return restaurantRepository.save(r);
    }

    public List<Restaurant> searchRestaurants(String search, String priceRange) {
        return restaurantRepository.searchAndFilter(search, priceRange);
    }

    public Restaurant likeRestaurant(Long userId, Long restaurantId) {
        Restaurant r = restaurantRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        if (r.getLikedByUserIds().contains(userId)) {
            r.getLikedByUserIds().remove(userId);
        } else {
            r.getLikedByUserIds().add(userId);
        }
        return restaurantRepository.save(r);
    }

    public Restaurant commentRestaurant(Long userId, Long restaurantId, String text) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Restaurant r = restaurantRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));

        String fullName = user.getFirstName() + " " + user.getLastName();
        Restaurant.RestaurantComment comment = new Restaurant.RestaurantComment(userId, fullName, text);
        r.getComments().add(comment);
        return restaurantRepository.save(r);
    }

    public void deleteRestaurant(Long userId, Long restaurantId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ensureAdmin(user);
        Restaurant r = restaurantRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        restaurantRepository.delete(r);
    }

    // ==========================================
    // CONTRIBUTOR PROFILE DETAILS
    // ==========================================
    public List<Movie> getMoviesByUploadedBy(Long userId) {
        return movieRepository.findByUploadedById(userId);
    }
    public List<WebSeries> getWebSeriesByUploadedBy(Long userId) {
        return webSeriesRepository.findByUploadedById(userId);
    }
    public List<Game> getGamesByUploadedBy(Long userId) {
        return gameRepository.findByUploadedById(userId);
    }
    public List<Place> getPlacesByUploadedBy(Long userId) {
        return placeRepository.findByUploadedById(userId);
    }
    public List<Restaurant> getRestaurantsByUploadedBy(Long userId) {
        return restaurantRepository.findByUploadedById(userId);
    }
}

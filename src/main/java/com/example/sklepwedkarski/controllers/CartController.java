package com.example.sklepwedkarski.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sklepwedkarski.entity.Cart;
import com.example.sklepwedkarski.entity.CartItem;
import com.example.sklepwedkarski.entity.FishingStand;
import com.example.sklepwedkarski.entity.Product;
import com.example.sklepwedkarski.entity.User;
import com.example.sklepwedkarski.repository.CartItemRepository;
import com.example.sklepwedkarski.repository.CartRepository;
import com.example.sklepwedkarski.repository.FishingStandRepository;
import com.example.sklepwedkarski.repository.ProductRepository;
import com.example.sklepwedkarski.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/cart", produces = "application/json;charset=UTF-8")
@CrossOrigin(origins = "*")
public class CartController {

    public static class ReservationRequest {
    private FishingStandId fishingStand;
    private String startTime;
    private String endTime;
    private LocalDate reservationDate;

    // Gettery i Settery
    public FishingStandId getFishingStand() { return fishingStand; }
    public void setFishingStand(FishingStandId fishingStand) { this.fishingStand = fishingStand; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public LocalDate getReservationDate() {
        return reservationDate;
    }
    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public static class FishingStandId {
        private Integer id;
        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
    }
    }

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // 1. Pobieranie zawartości koszyka użytkownika (wymagane przez Navbar i stronę Koszyka)
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        Cart cart = user.getCart();

        if (cart == null) {
            // Jeśli użytkownik nie ma jeszcze koszyka, zwracamy pustą listę
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<CartItem> items = cartItemRepository.findByCart(cart);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{userId}/reservation")
    public ResponseEntity<Cart> getCartReservation(@PathVariable Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        Cart cart = user.getCart();

        if (cart == null) {
            // Jeśli użytkownik nie ma jeszcze koszyka, zwracamy pustą listę
            //return ResponseEntity.ok(new ArrayList<>());
        }

        return ResponseEntity.ok(cart);
    }

    // Zmieniamy mapowanie, aby przyjmowało ID użytkownika w adresie URL: /api/cart/{userId}/add
@PostMapping("/{userId}/add")
public ResponseEntity<?> addToCart(
        @PathVariable Integer userId,
        @RequestParam Integer productId,
        @RequestParam(defaultValue = "1") Integer quantity) { // <-- DODANO obsługę quantity!

    // 1. Sprawdzamy czy użytkownik istnieje
    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
        return ResponseEntity.status(404).body("Nie znaleziono użytkownika o ID: " + userId);
    }
    User user = userOpt.get();

    // 2. Sprawdzamy czy produkt istnieje
    Optional<Product> productOpt = productRepository.findById(productId);
    if (!productOpt.isPresent()) {
        return ResponseEntity.status(404).body("Nie znaleziono produktu o ID: " + productId);
    }
    Product product = productOpt.get();
    
    // 3. Sprawdzamy stan magazynowy
    if (product.getStockQuantity() < quantity) {
        return ResponseEntity.badRequest().body("Brak wystarczającej ilości produktu w magazynie.");
    }

    // 4. Pobieramy lub tworzymy nowy koszyk dla użytkownika
    Cart cart = user.getCart();
    if (cart == null) {
        cart = new Cart();
        cart.setUser(user);
        cart = cartRepository.save(cart);
        user.setCart(cart);
        userRepository.save(user);
    }

    // 5. Sprawdzamy, czy ten produkt jest już w tym koszyku
    Optional<CartItem> existingItemOpt = cartItemRepository.findByCartAndProduct(cart, product);
    CartItem cartItem;

    if (existingItemOpt.isPresent()) {
        // Jeśli produkt już jest w koszyku, zwiększamy jego ilość o przesłaną wartość
        cartItem = existingItemOpt.get();
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
    } else {
        // Jeśli produktu nie ma, tworzymy nową pozycję w koszyku
        cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
    }

    // 6. Zapisujemy pozycję w koszyku
    CartItem savedItem = cartItemRepository.save(cartItem);
    return ResponseEntity.ok(savedItem);
}
@Autowired
    private FishingStandRepository fishingStandRepository;

@PutMapping("/{userId}/reservation")
    public ResponseEntity<?> updateCartReservation(
            @PathVariable Integer userId, 
            @RequestBody ReservationRequest request) {
        
        // 1. Szukamy koszyka przypisanego do danego użytkownika
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        Optional<Cart> cartOptional = Optional.ofNullable(user.getCart());
        
        if (cartOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = cartOptional.get();

        // 2. Jeśli przesłano ID stanowiska, pobieramy je z bazy i przypisujemy do koszyka
        if (request.getFishingStand() != null && request.getFishingStand().getId() != null) {
            Optional<FishingStand> standOptional = fishingStandRepository.findById(request.getFishingStand().getId());
            if (standOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Nie znaleziono wybranego stanowiska rybackiego.");
            }
            cart.setFishingStand(standOptional.get());
        } else {
            cart.setFishingStand(null);
        }

        // 3. Przypisujemy pozostałe płaskie pola z żądania do encji koszyka
        cart.setStartTime(request.getStartTime());
        cart.setEndTime(request.getEndTime());
        cart.setReservationDate(request.getReservationDate());

        // 4. Zapisujemy zaktualizowany koszyk
        Cart updatedCart = cartRepository.save(cart);

        return ResponseEntity.ok(updatedCart);
    }

@DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Integer cartItemId) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        
        if (!cartItemOpt.isPresent()) {
            return ResponseEntity.status(404).body("Nie znaleziono pozycji koszyka o ID: " + cartItemId);
        }

        cartItemRepository.delete(cartItemOpt.get());
        return ResponseEntity.ok().body("{\"message\": \"Produkt został usunięty z koszyka.\"}");
    }

@DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(404).body("Nie znaleziono użytkownika o ID: " + userId);
        }

        Cart cart = userOpt.get().getCart();
        if (cart != null) {
            cartItemRepository.deleteAll();
            cart.setFishingStand(null);
            cart.setEndTime(null);
            cart.setReservationDate(null);
            cart.setStartTime(null);
            cartRepository.save(cart);
        }

        return ResponseEntity.ok().body("{\"message\": \"Koszyk został pomyślnie wyczyszczony.\"}");
    }
}
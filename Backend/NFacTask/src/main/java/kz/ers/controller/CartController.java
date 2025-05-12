package kz.ers.controller;

import kz.ers.DTO.EmojiIdDTO;
import kz.ers.model.Emoji;
import kz.ers.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("")
    public ResponseEntity<List<Emoji>> getCart() {
        return new ResponseEntity<>(cartService.getAllEmojis(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> addToCart(@RequestBody EmojiIdDTO emojiId) {
        cartService.add(emojiId.getEmojiId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{emojiId}")
    public ResponseEntity<?> deleteFromCart(@PathVariable("emojiId") int emojiId) {
        cartService.delete(emojiId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

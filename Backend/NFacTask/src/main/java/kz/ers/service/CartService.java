package kz.ers.service;

import kz.ers.model.Cart;
import kz.ers.model.Emoji;
import kz.ers.repo.CartRepo;
import kz.ers.repo.EmojiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    private final CartRepo cartRepo;
    private final EmojiRepo emojiRepo;
    @Autowired
    public CartService(CartRepo cartRepo, EmojiRepo emojiRepo) {
        this.cartRepo = cartRepo;
        this.emojiRepo = emojiRepo;
    }


    public List<Emoji> getAllEmojis() {

        List<Emoji> emojis = new ArrayList<>();

        for(Cart el : cartRepo.findAll()) {
            if(emojiRepo.findById(el.getEmoji_id()).isPresent())
                emojis.add(emojiRepo.findById(el.getEmoji_id()).get());
        }

        return emojis;

    }

    public void add(int emojiId) {
        cartRepo.save(new Cart(emojiId));
    }

    public void delete(int emojiId) {
        cartRepo.delete(new Cart(emojiId));
    }

}

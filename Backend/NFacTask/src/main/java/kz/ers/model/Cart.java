package kz.ers.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
public class Cart {

    public Cart(){}

    public Cart(int emoji_id) {
        this.emoji_id = emoji_id;
    }

    @Id
    private int emoji_id;


    public int getEmoji_id() {
        return emoji_id;
    }

    public void setEmoji_id(int emoji_id) {
        this.emoji_id = emoji_id;
    }
}

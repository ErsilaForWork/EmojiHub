package kz.ers.controller;

import kz.ers.DTO.InfoToJson;
import kz.ers.model.Emoji;
import kz.ers.service.EmojiService;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmojiContoller {
    private final EmojiService emojiService;
    private final OpenAiChatModel chatModel;

    @Autowired
    public EmojiContoller(EmojiService emojiService, OpenAiChatModel chatModel) {
        this.emojiService = emojiService;
        this.chatModel = chatModel;
    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return emojiService.getAllCategories();
    }

    @GetMapping("/emojis")
    public List<Emoji> search(@RequestParam("search") String search, @RequestParam("skinTone") int skinTone) {
        return emojiService.search(search, skinTone);
    }

    @GetMapping("/emojis/{emojiId}")
    public ResponseEntity<InfoToJson> getInfo(@PathVariable("emojiId") int emojiId) {
        Emoji emoji = emojiService.getById(emojiId);

        String response = chatModel.call("Write interesting fact about history, design and other interesting things of the " + emoji.getName() + " emoji as one text, length : 15-30 words, in the answer if you want to refer for emoji use just 'this emoji'");

        return ResponseEntity.ok(new InfoToJson(emoji, response));
    }

    @GetMapping("/emojis/random")
    public ResponseEntity<InfoToJson> getRandom() {

        int emojiId = (int) (Math.random()*1700 + 1);

        Emoji emoji = emojiService.getById(emojiId);

        String response = chatModel.call("Write interesting fact about history, design and other interesting things of the " + emoji.getName() + " emoji as one text, length : 15-30 words, in the answer if you want to refer for emoji use just 'this emoji'");

        return ResponseEntity.ok(new InfoToJson(emoji, response));
    }
}

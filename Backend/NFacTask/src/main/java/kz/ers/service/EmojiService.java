package kz.ers.service;

import kz.ers.model.Emoji;
import kz.ers.repo.EmojiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmojiService {

    private final EmojiRepo emojiRepo;


    @Autowired
    public EmojiService(EmojiRepo repo) {
        this.emojiRepo = repo;
    }


    public List<String> getAllCategories() {
        List<String> allCategories = new ArrayList<>();

        for(Emoji emoji : getAllEmojis()) {
            allCategories.add(emoji.getCategory());
        }

        return allCategories;
    }

    public List<Emoji> getAllEmojis() {
        return  emojiRepo.findAll();
    }

    public List<Emoji> search(String search, int skinTone) {
        String skinFilter;

        switch (skinTone){
            case 1:
                skinFilter = "";
                break;
            case 2:
                skinFilter = "type-1-2";
                break;
            case 3:
                skinFilter = "type-3";
                break;
            case 4:
                skinFilter = "type-4";
                break;
            case 5:
                skinFilter = "type-5";
                break;
            case 6:
                skinFilter = "type-6";
                break;
            default:
                skinFilter = null;
        }
        if(skinFilter == null) {
            return emojiRepo.searchWithoutSkinFilter(search);
        }else if(skinFilter.isEmpty()) {
            return emojiRepo.searchForCommon(search);
        }
        return emojiRepo.search(search, skinFilter);
    }

    public Emoji getById(int emojiId) {
        return emojiRepo.findById(emojiId).get();
    }
}

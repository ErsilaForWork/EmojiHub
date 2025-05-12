package kz.sendingdata.service;

import kz.sendingdata.model.Emoji;
import kz.sendingdata.repo.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class DataService {
    private final Repo repo;
    private static final String API_URL = "https://emojihub.yurace.pro/api/";
    private final RestTemplate template;

    @Autowired
    public DataService(Repo repo, RestTemplate template) {
        this.repo = repo;
        this.template = template;
    }

    public List<Emoji> getAllEmoji() {
        System.out.println("Sending request to the API");
        return Arrays.asList(template.getForObject(API_URL+"all",Emoji[].class));
    }

    public void saveAll() {
        System.out.println("Saving all emojis");
        repo.saveAll(getAllEmoji());
        System.out.println("Quiting the API calling");
        System.out.println("Saved all");
    }
}

package kz.ers.DTO;

import kz.ers.model.Emoji;

public class InfoToJson {
    private Emoji emoji;
    private String aiResponse;


    public InfoToJson(Emoji emoji, String aiResponse) {
        this.emoji = emoji;
        this.aiResponse = aiResponse;
    }

    public Emoji getEmoji() {
        return emoji;
    }

    public void setEmoji(Emoji emoji) {
        this.emoji = emoji;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }
}

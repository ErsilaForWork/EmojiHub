package kz.sendingdata.dto;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmojiDTO {
    private int id;

    private String name;
    private String category;
    private String group;

    private List<String> htmlCode;

    private List<String> unicode;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String groups) {
        this.group = groups;
    }

    public List<String> getHtmlCode() {
        return htmlCode;
    }

    public void setHtmlCode(List<String> htmlCode) {
        this.htmlCode = htmlCode;
    }

    public List<String> getUnicode() {
        return unicode;
    }

    public void setUnicode(List<String> unicode) {
        this.unicode = unicode;
    }

    @Override
    public String toString() {
        return "EmojiDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", group='" + group + '\'' +
                ", htmlCode=" + htmlCode +
                ", unicode=" + unicode +
                '}';
    }
}

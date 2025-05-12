package kz.sendingdata.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name = "emoji_table")
@SequenceGenerator(
        name = "seq",
        sequenceName = "new_seq",
        allocationSize = 1
)
public class Emoji {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private int id;

    private String name;
    private String category;
    private String groups;

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
        return groups;
    }

    public void setGroup(String group) {
        this.groups = group;
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
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", group='" + groups + '\'' +
                ", htmlCode=" + htmlCode +
                ", unicode=" + unicode +
                '}';
    }
}
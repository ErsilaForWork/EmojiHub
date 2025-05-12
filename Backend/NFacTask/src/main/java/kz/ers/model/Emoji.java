package kz.ers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name = "emoji_table")
public class Emoji {

    @Id
    private int id;

    private String name;
    private String category;
    private String groups;
    private List<String> htmlCode;
    private List<String> unicode;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public void setGroup(String groups) {
        this.groups = groups;
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
        return "Emoji{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", groups='" + groups + '\'' +
                ", htmlCode=" + htmlCode +
                ", unicode=" + unicode +
                '}';
    }
}

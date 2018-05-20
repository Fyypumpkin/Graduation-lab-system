package cn.fyypumpkin.manage.lab.entity;

public class Thesis {
    private Integer id;

    private String username;

    private String name;

    private String firstAuthor;

    private String teleAuthor;

    private String journalName;

    private String publishTime;

    private String journalType;

    private String journalFrom;

    private String prove;

    private String journalSource;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstAuthor() {
        return firstAuthor;
    }

    public void setFirstAuthor(String firstAuthor) {
        this.firstAuthor = firstAuthor;
    }

    public String getTeleAuthor() {
        return teleAuthor;
    }

    public void setTeleAuthor(String teleAuthor) {
        this.teleAuthor = teleAuthor;
    }

    public String getJournalName() {
        return journalName;
    }

    public void setJournalName(String journalName) {
        this.journalName = journalName;
    }

    public String getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(String publishTime) {
        this.publishTime = publishTime;
    }

    public String getJournalType() {
        return journalType;
    }

    public void setJournalType(String journalType) {
        this.journalType = journalType;
    }

    public String getJournalFrom() {
        return journalFrom;
    }

    public void setJournalFrom(String journalFrom) {
        this.journalFrom = journalFrom;
    }

    public String getProve() {
        return prove;
    }

    public void setProve(String prove) {
        this.prove = prove;
    }

    public String getJournalSource() {
        return journalSource;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setJournalSource(String journalSource) {
        this.journalSource = journalSource;
    }
}

package cn.fyypumpkin.manage.lab.entity;

import java.util.Date;

public class Thesis {
    private Integer id;

    private String username;

    private String name;

    private String firstAuthor;

    private String teleAuthor;

    private String journalName;

    private Date publishTime;

    private String journalType;

    private String journalFrom;

    private String prove;

    private String journalSource;

    private String year;

    private String otherAuthor;

    private String page;

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getOtherAuthor() {
        return otherAuthor;
    }

    public void setOtherAuthor(String otherAuthor) {
        this.otherAuthor = otherAuthor;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

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

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
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

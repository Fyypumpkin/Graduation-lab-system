package cn.fyypumpkin.manage.lab.dto;

public class ThesisDTO {
    private Integer id;

    private String name;

    private String firstAuthor;

    private String teleAuthor;

    private String journalName;

    private String journalSource;

    private String journalFrom;

    private String journalType;

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

    public String getJournalFrom() {
        return journalFrom;
    }

    public void setJournalFrom(String journalFrom) {
        this.journalFrom = journalFrom;
    }

    public String getJournalType() {
        return journalType;
    }

    public void setJournalType(String journalType) {
        this.journalType = journalType;
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

    public String getJournalSource() {
        return journalSource;
    }

    public void setJournalSource(String journalSource) {
        this.journalSource = journalSource;
    }
}

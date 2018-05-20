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

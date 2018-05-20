package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

import java.util.List;

public class GetThesisListRequest extends PageInfo {
    private String username;

    private String name;

    private String journalType;

    private String[] journalFrom;

    public String getJournalType() {
        return journalType;
    }

    public void setJournalType(String journalType) {
        this.journalType = journalType;
    }

    public String[] getJournalFrom() {
        return journalFrom;
    }

    public void setJournalFrom(String[] journalFrom) {
        this.journalFrom = journalFrom;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

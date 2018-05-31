package cn.fyypumpkin.manage.lab.entity;

import java.util.Date;

public class Win {
    private Integer id;
    private String username;
    private String winName;
    private String winInst;
    private Date winTime;
    private String winRank;
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getWinName() {
        return winName;
    }

    public void setWinName(String winName) {
        this.winName = winName;
    }

    public String getWinInst() {
        return winInst;
    }

    public void setWinInst(String winInst) {
        this.winInst = winInst;
    }

    public Date getWinTime() {
        return winTime;
    }

    public void setWinTime(Date winTime) {
        this.winTime = winTime;
    }

    public String getWinRank() {
        return winRank;
    }

    public void setWinRank(String winRank) {
        this.winRank = winRank;
    }
}

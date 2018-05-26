package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

public class GetWinListRequest extends PageInfo {
    private String winName;
    private String winRank;
    private String username;

    public String getWinName() {
        return winName;
    }

    public void setWinName(String winName) {
        this.winName = winName;
    }

    public String getWinRank() {
        return winRank;
    }

    public void setWinRank(String winRank) {
        this.winRank = winRank;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

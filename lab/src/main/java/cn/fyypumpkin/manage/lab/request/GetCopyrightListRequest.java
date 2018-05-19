package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

public class GetCopyrightListRequest extends PageInfo {
    private String username;

    private String allName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAllName() {
        return allName;
    }

    public void setAllName(String allName) {
        this.allName = allName;
    }
}

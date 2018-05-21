package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

public class GetPrjListRequest extends PageInfo {
    private String username;

    private String name;

    private String status;

    private String headPeople;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHeadPeople() {
        return headPeople;
    }

    public void setHeadPeople(String headPeople) {
        this.headPeople = headPeople;
    }
}

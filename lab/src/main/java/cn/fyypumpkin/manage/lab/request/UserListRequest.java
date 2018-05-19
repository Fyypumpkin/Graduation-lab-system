package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

public class UserListRequest extends PageInfo {
    private String realName;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }
}

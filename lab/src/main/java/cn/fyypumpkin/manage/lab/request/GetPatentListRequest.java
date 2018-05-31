package cn.fyypumpkin.manage.lab.request;

import cn.fyypumpkin.manage.lab.lib.result.PageInfo;

public class GetPatentListRequest extends PageInfo {
    private String name;
    private String username;
    private String patentNo;
    private String patentOriginNo;

    public String getPatentOriginNo() {
        return patentOriginNo;
    }

    public void setPatentOriginNo(String patentOriginNo) {
        this.patentOriginNo = patentOriginNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPatentNo() {
        return patentNo;
    }

    public void setPatentNo(String patentNo) {
        this.patentNo = patentNo;
    }
}

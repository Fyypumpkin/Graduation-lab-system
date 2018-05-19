package cn.fyypumpkin.manage.lab.dto;

/**
 * @author fyypumpkin on 2018/5/5.
 */

public class LoginDTO {
    String username;

    // 目前只有3种（超级管理员 3，管理员 3，普通用户 1）
    Integer role;

    String realName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }
}

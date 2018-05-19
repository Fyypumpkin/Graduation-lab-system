package cn.fyypumpkin.manage.lab.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author fyypumpkin on 2018/5/19.
 */
@Data
@EqualsAndHashCode
public class RegisterRequest {

    /**
     * 用户名
     */
    private String username;

    /**
     * 1 man 2 female
     */
    private Integer sex;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 学院
     */
    private String college;


    /**
     * 手机号
     */
    private String phone;

    /**
     * 成员类型
     * 1普通成员， 2普通管理员， 3超级管理员
     */
    private Integer userType;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}

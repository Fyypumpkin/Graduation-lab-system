package cn.fyypumpkin.manage.lab.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author fyypumpkin on 2018/5/5.
 */
@Data
@EqualsAndHashCode
public class LoginRequest {

    private String passWd;

    // 使用SHA加密
    private String username;

    public String getPassWd() {
        return passWd;
    }

    public void setPassWd(String passWd) {
        this.passWd = passWd;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

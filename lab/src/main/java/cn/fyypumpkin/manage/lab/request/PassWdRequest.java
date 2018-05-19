package cn.fyypumpkin.manage.lab.request;

import lombok.Data;

@Data
public class PassWdRequest {
    private String oldPassWd;

    private String newPassWd;

    public String getOldPassWd() {
        return oldPassWd;
    }

    public void setOldPassWd(String oldPassWd) {
        this.oldPassWd = oldPassWd;
    }

    public String getNewPassWd() {
        return newPassWd;
    }

    public void setNewPassWd(String newPassWd) {
        this.newPassWd = newPassWd;
    }
}

package cn.fyypumpkin.manage.lab.entity;

import lombok.Data;

import java.util.Set;

/**
 * @author fyypumpkin on 2018/5/14.
 */
@Data
public class User<T> {
    private String username;

    private String passWd;

    private Set<T> roles;

    private Set<T> permissions;

    private Boolean locked;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassWd() {
        return passWd;
    }

    public void setPassWd(String passWd) {
        this.passWd = passWd;
    }

    public Set<T> getRoles() {
        return roles;
    }

    public void setRoles(Set<T> roles) {
        this.roles = roles;
    }

    public Set<T> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<T> permissions) {
        this.permissions = permissions;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }
}

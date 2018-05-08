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

    private String username;
}

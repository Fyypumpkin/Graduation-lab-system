package cn.fyypumpkin.manage.lab.lib.utils;

import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;

/**
 * @author fyypumpkin on 2018/5/19.
 */

public class ConvertUtil {
    public static User convertRequestToUser(RegisterRequest registerRequest) {
        User user = new User();
        user.setLocked(false);
        user.setPassWd("123456");
        user.setUsername(registerRequest.getUsername());
        user.setRole(registerRequest.getUserType());
        user.setCollege(registerRequest.getCollege());
        user.setRealName(registerRequest.getRealName());
        user.setSex(registerRequest.getSex());
        user.setPhone(registerRequest.getPhone());
        return user;
    }
}

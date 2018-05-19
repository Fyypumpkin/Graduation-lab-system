package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.UserDao;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.utils.ConvertUtil;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * @author fyypumpkin on 2018/5/19.
 */

@Repository
public class UserRepository {
    @Resource
    private UserDao userDao;

    public Boolean register(RegisterRequest registerRequest) {
        User user = ConvertUtil.convertRequestToUser(registerRequest);
        return userDao.insertUser(user) >= 1;
//        return true;
    }
}

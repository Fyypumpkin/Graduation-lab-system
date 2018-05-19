package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dao.UserDao;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.utils.ConvertUtil;
import cn.fyypumpkin.manage.lab.repository.UserRepository;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author fyypumpkin on 2018/5/19.
 */
@Service
public class UserService {

    @Resource
    private UserRepository userRepository;

    public Boolean register(RegisterRequest registerRequest) {
        return userRepository.register(registerRequest);
    }
}

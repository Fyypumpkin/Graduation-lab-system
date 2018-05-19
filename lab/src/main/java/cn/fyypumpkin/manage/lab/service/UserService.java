package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dao.UserDao;
import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.utils.ConvertUtil;
import cn.fyypumpkin.manage.lab.repository.UserRepository;
import cn.fyypumpkin.manage.lab.request.ModifyUserRequest;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import cn.fyypumpkin.manage.lab.request.UserListRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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

    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public Boolean changePasswd(String passWd, String username){
        return userRepository.changePassWd(passWd, username);
    }

    public List<UserDTO> getUserList(UserListRequest request){
        return userRepository.getUserList(request);
    }

    public int userListCount(UserListRequest request){
        return userRepository.userListCount(request);
    }

    public Boolean modifyUser(ModifyUserRequest request){
        return userRepository.modifyUser(request) >= 1;
    }
}

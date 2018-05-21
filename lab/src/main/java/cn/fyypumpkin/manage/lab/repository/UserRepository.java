package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.UserDao;
import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.utils.ConvertUtil;
import cn.fyypumpkin.manage.lab.request.ModifyUserRequest;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import cn.fyypumpkin.manage.lab.request.UserListRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

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
    }

    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }

    public Boolean changePassWd(String passWd, String username) {
        return userDao.changePassWd(passWd, username);
    }

    public List<UserDTO> getUserList(UserListRequest request) {
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        List<User> result = userDao.getUserList(request.getRealName(), offset, pageSize);
        List<UserDTO> re = new ArrayList<>();
        for (int i = 0; i < result.size(); i++) {
            User user = result.get(i);
            UserDTO userDTO = new UserDTO();
            userDTO.setCollege(user.getCollege());
            userDTO.setPhone(user.getPhone());
            userDTO.setRealName(user.getRealName());
            userDTO.setUsername(user.getUsername());
            re.add(userDTO);
        }
        return re;
    }

    public int userListCount(UserListRequest request) {
        return userDao.userListCount(request.getRealName());
    }

    public int modifyUser(ModifyUserRequest request) {
        return userDao.modifyUser(request);
    }

    public List<UserDTO> getAllUserList() {
        return userDao.getAllUserList();
    }

}

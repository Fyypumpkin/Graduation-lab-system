package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.request.ModifyUserRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author fyypumpkin on 2018/5/19.
 */
@Mapper
public interface UserDao {
    Integer insertUser(User user);

    User getUserByUsername(@Param("username") String username);

    Boolean changePassWd(@Param("passWd") String passWd, @Param("username") String username);

    List<User> getUserList(@Param("realName") String realName, @Param("offset") int offset, @Param("pageSize") int pageSize);

    int userListCount(@Param("realName") String realName);

    int modifyUser(@Param("user") ModifyUserRequest request);

    List<UserDTO> getAllUserList();
}

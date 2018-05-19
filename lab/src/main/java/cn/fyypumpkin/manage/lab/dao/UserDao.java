package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author fyypumpkin on 2018/5/19.
 */
@Mapper
public interface UserDao {
    Integer insertUser(User user);
}

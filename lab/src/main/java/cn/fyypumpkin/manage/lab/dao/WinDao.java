package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.entity.Win;
import cn.fyypumpkin.manage.lab.request.GetWinListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WinDao {
    List<Win> getWinList(@Param("request")GetWinListRequest request, @Param("offset") Integer offset, @Param("pageSize") Integer pageSize);
    int countWin(@Param("request")GetWinListRequest request);
    int delWin(@Param("id") Integer id);
    int createWin(@Param("win") Win win);
    int updateWin(@Param("win") Win win);
}

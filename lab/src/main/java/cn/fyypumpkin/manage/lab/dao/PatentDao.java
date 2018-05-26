package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.entity.Patent;
import cn.fyypumpkin.manage.lab.request.GetPatentListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PatentDao {
    List<Patent> getPatentList(@Param("request")GetPatentListRequest request, @Param("offset") Integer offset, @Param("pageSize") Integer pageSize);
    int countPatent(@Param("request")GetPatentListRequest request);
    int delPatent(@Param("id") Integer id);
    int createPatent(@Param("patent") Patent patent);
    int updatePatent(@Param("patent") Patent patent);
}

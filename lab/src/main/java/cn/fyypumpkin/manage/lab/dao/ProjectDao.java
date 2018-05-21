package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.dto.PrjDTO;
import cn.fyypumpkin.manage.lab.entity.Project;
import cn.fyypumpkin.manage.lab.request.CreateProjectRequest;
import cn.fyypumpkin.manage.lab.request.GetPrjListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectDao {
    int createPrj(@Param("request") CreateProjectRequest request);

    int modifyPrj(@Param("request") Project request);

    List<PrjDTO> getPrjList(@Param("request") GetPrjListRequest request, @Param("offset") int offset, @Param("pageSize") int pageSize);

    int prjListCount(@Param("request") GetPrjListRequest request);

    Project getPrjInfoById(@Param("id") Integer id);

    int delPrjInfoById(@Param("id") Integer id);
}

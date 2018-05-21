package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.entity.Thesis;
import cn.fyypumpkin.manage.lab.request.GetThesisListRequest;
import cn.fyypumpkin.manage.lab.request.ModifyThesisInfoRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ThesisDao {
    List<Thesis> getThesisList(@Param("request") GetThesisListRequest request, @Param("offset") int offset, @Param("pageSize") int pageSize);

    int thesisListCount(@Param("request") GetThesisListRequest request);

    Thesis getThesisInfo(@Param("id") Integer id);

    int modifyThesisInfo(@Param("request")ModifyThesisInfoRequest request);

    int createThesisInfo(@Param("request")ModifyThesisInfoRequest request);

    int delThesisInfo(@Param("id") Integer id);
}

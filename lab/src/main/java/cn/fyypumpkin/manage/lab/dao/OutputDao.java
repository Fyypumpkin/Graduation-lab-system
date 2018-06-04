package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.dto.export.Prj;
import cn.fyypumpkin.manage.lab.request.export.OutputPatentRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputPrjRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputThesisRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputWinRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OutputDao {
    List<Object> getAllUserList();

    List<Object> getPatentList(@Param("request") OutputPatentRequest request);

    String getRealName(@Param("username") String username);

    String getPhone(@Param("username") String username);

    List<Object> getWinList(@Param("request") OutputWinRequest request);

    List<Object> getThesisList(@Param("request") OutputThesisRequest request);

    List<Prj> getPrjList(@Param("request")OutputPrjRequest request);
}

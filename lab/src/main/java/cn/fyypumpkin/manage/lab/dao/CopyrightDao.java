package cn.fyypumpkin.manage.lab.dao;

import cn.fyypumpkin.manage.lab.dto.CopyrightListDTO;
import cn.fyypumpkin.manage.lab.entity.Copyright;
import cn.fyypumpkin.manage.lab.entity.Extend;
import cn.fyypumpkin.manage.lab.entity.Origin;
import cn.fyypumpkin.manage.lab.request.GetCopyrightListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CopyrightDao {
    List<CopyrightListDTO> getCopyrightList(@Param("request") GetCopyrightListRequest request, @Param("offset") int offset, @Param("pageSize") int pageSize);

    int copyrightListCount(@Param("request") GetCopyrightListRequest request);

    Copyright getCopyrightById(@Param("id") Integer id);

    List<Origin> getOriginsByKey(@Param("key") String key);

    List<Extend> getExtendsByKey(@Param("key") String key);
}

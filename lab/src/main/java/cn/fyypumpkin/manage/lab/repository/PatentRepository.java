package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.PatentDao;
import cn.fyypumpkin.manage.lab.entity.Patent;
import cn.fyypumpkin.manage.lab.request.GetPatentListRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class PatentRepository {
    @Resource
    private PatentDao patentDao;

    public List<Patent> getPatentList(GetPatentListRequest request) {
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        return patentDao.getPatentList(request, offset, pageSize);
    }

    public int countPatent(GetPatentListRequest request) {
        return patentDao.countPatent(request);
    }

    public Boolean delPatent(Integer id) {
        return patentDao.delPatent(id) >= 1;
    }

    public Boolean createPatent(Patent patent) {
        return patentDao.createPatent(patent) >= 1;
    }

    public Boolean updatePatent(Patent patent) {
        return patentDao.updatePatent(patent) >= 1;
    }
}

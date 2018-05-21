package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.ProjectDao;
import cn.fyypumpkin.manage.lab.dto.PrjDTO;
import cn.fyypumpkin.manage.lab.entity.Project;
import cn.fyypumpkin.manage.lab.request.CreateProjectRequest;
import cn.fyypumpkin.manage.lab.request.GetPrjListRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class ProjectRepository {
    @Resource
    private ProjectDao projectDao;

    public Boolean createPrj(CreateProjectRequest request){
        return projectDao.createPrj(request) >= 1;
    }

    public Boolean modifyPrj(Project request){
        return projectDao.modifyPrj(request) >= 1;
    }

    public List<PrjDTO> getPrjList(GetPrjListRequest request){
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        return projectDao.getPrjList(request, offset, pageSize);
    }

    public int prjListCount(GetPrjListRequest request){
        return projectDao.prjListCount(request);
    }

    public Project getPrjInfoById(Integer id) {
        return projectDao.getPrjInfoById(id);
    }

    public Boolean delPrjInfoById(Integer id) {
        return projectDao.delPrjInfoById(id) >= 1;
    }
}

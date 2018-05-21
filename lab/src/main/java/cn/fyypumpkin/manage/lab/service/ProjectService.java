package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dto.PrjDTO;
import cn.fyypumpkin.manage.lab.entity.Project;
import cn.fyypumpkin.manage.lab.repository.ProjectRepository;
import cn.fyypumpkin.manage.lab.request.CreateProjectRequest;
import cn.fyypumpkin.manage.lab.request.GetPrjListRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ProjectService {
    @Resource
    private ProjectRepository projectRepository;

    public Boolean createPrj(CreateProjectRequest request){
        return projectRepository.createPrj(request);
    }

    public Boolean modifyPrj(Project request){
        return projectRepository.modifyPrj(request);
    }

    public List<PrjDTO> getPrjList(GetPrjListRequest request){
        return projectRepository.getPrjList(request);
    }

    public int prjListCount(GetPrjListRequest request){
        return projectRepository.prjListCount(request);
    }

    public Project getPrjInfoById(Integer id){
        return projectRepository.getPrjInfoById(id);
    }

    public Boolean delPrjInfoById(Integer id){
        return projectRepository.delPrjInfoById(id);
    }
}

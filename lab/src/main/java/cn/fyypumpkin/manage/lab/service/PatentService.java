package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.entity.Patent;
import cn.fyypumpkin.manage.lab.repository.PatentRepository;
import cn.fyypumpkin.manage.lab.request.GetPatentListRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PatentService {
    @Resource
    private PatentRepository repository;


    public List<Patent> getPatentList(GetPatentListRequest request){
        return repository.getPatentList(request);
    }

    public int countPatent(GetPatentListRequest request){
        return repository.countPatent(request);
    }

    public Boolean delPatent(Integer id) {
        return repository.delPatent(id);
    }

    public Boolean createPatent(Patent patent){
        return repository.createPatent(patent);
    }

    public Boolean updatePatent(Patent patent){
        return repository.updatePatent(patent);
    }
}

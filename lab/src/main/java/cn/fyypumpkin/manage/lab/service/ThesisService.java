package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dto.ThesisDTO;
import cn.fyypumpkin.manage.lab.entity.Thesis;
import cn.fyypumpkin.manage.lab.repository.ThesisRepository;
import cn.fyypumpkin.manage.lab.request.GetThesisListRequest;
import cn.fyypumpkin.manage.lab.request.ModifyThesisInfoRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ThesisService {
    @Resource
    private ThesisRepository thesisRepository;

    public List<ThesisDTO> getThesisList(GetThesisListRequest request) {
        return thesisRepository.getThesisList(request);
    }

    public int thesisListCount(GetThesisListRequest request) {
        return thesisRepository.thesisListCount(request);
    }

    public Thesis getThesisInfo(Integer id) {
        return thesisRepository.getThesisInfo(id);
    }

    public Boolean modifyThesisInfo(ModifyThesisInfoRequest request) {
        return thesisRepository.modifyThesisInfo(request);
    }
}

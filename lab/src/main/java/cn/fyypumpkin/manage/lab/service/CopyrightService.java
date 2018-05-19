package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dto.CopyrightDTO;
import cn.fyypumpkin.manage.lab.dto.CopyrightListDTO;
import cn.fyypumpkin.manage.lab.repository.CopyrightRepository;
import cn.fyypumpkin.manage.lab.request.GetCopyrightInfoRequest;
import cn.fyypumpkin.manage.lab.request.GetCopyrightListRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CopyrightService {
    @Resource
    private CopyrightRepository copyrightRepository;

    public List<CopyrightListDTO> getCopyrightList(GetCopyrightListRequest request){
        return copyrightRepository.getCopyrightList(request);
    }

    public int copyrightListCount(GetCopyrightListRequest request){
        return copyrightRepository.copyrightListCount(request);
    }

    public CopyrightDTO getCopyrightInfo(GetCopyrightInfoRequest request){
        return copyrightRepository.getCopyrightInfo(request);
    }
}

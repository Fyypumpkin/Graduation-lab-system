package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.entity.Win;
import cn.fyypumpkin.manage.lab.repository.WinRepository;
import cn.fyypumpkin.manage.lab.request.GetWinListRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WinService {
    @Resource
    private WinRepository repository;

    public List<Win> getWinList(GetWinListRequest request){
        return repository.getWinList(request);
    }

    public int countWin(GetWinListRequest request){
        return repository.countWin(request);
    }

    public Boolean delWin(Integer id) {
        return repository.delWin(id);
    }

    public Boolean createWin(Win win){
        return repository.createWin(win);
    }

    public Boolean updateWin(Win win){
        return repository.updateWin(win);
    }
}

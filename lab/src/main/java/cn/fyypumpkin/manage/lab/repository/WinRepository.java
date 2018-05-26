package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.WinDao;
import cn.fyypumpkin.manage.lab.entity.Win;
import cn.fyypumpkin.manage.lab.request.GetWinListRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class WinRepository {
    @Resource
    private WinDao winDao;

    public List<Win> getWinList(GetWinListRequest request) {
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        return winDao.getWinList(request, offset, pageSize);
    }

    public int countWin(GetWinListRequest request) {
        return winDao.countWin(request);
    }

    public Boolean delWin(Integer id) {
        return winDao.delWin(id) >= 1;
    }

    public Boolean createWin(Win win) {
        return winDao.createWin(win) >= 1;
    }

    public Boolean updateWin(Win win) {
        return winDao.updateWin(win) >= 1;
    }
}

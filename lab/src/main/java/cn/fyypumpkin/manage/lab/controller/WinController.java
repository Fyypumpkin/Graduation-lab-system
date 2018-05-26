package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.entity.Win;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.request.GetWinListRequest;
import cn.fyypumpkin.manage.lab.service.WinService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class WinController {
    @Resource
    private WinService winService;

    @PostMapping("/getWinList")
    @ResponseBody
    public PageResult getWinList(@RequestBody GetWinListRequest request) {
        PageResult dataResult = new PageResult<>();
        dataResult.setSuccess(true);
        dataResult.setData(winService.getWinList(request));
        PageInfo pageInfo = new PageInfo();
        pageInfo.setTotalNum(winService.countWin(request));
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        dataResult.setPageInfo(pageInfo);
        return dataResult;
    }

    @PostMapping("/delWin/{id}")
    @ResponseBody
    public DataResult delWin(@PathVariable("id") Integer id) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(winService.delWin(id));
        return dataResult;
    }

    @PostMapping("/creteWin")
    @ResponseBody
    public DataResult createWin(@RequestBody Win request) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(winService.createWin(request));
        return dataResult;
    }

    @PostMapping("/updateWin")
    @ResponseBody
    public DataResult updateWin(@RequestBody Win request) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(winService.updateWin(request));
        return dataResult;
    }

}

package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.entity.Patent;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.request.GetPatentListRequest;
import cn.fyypumpkin.manage.lab.service.PatentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class PatentController {
    @Resource
    private PatentService patentService;


    @PostMapping("/getPatentList")
    @ResponseBody
    public PageResult createThesisInfo(@RequestBody GetPatentListRequest request) {
        PageResult dataResult = new PageResult<>();
        dataResult.setSuccess(true);
        dataResult.setData(patentService.getPatentList(request));
        PageInfo pageInfo = new PageInfo();
        pageInfo.setTotalNum(patentService.countPatent(request));
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        dataResult.setPageInfo(pageInfo);
        return dataResult;
    }

    @PostMapping("/delPatent/{id}")
    @ResponseBody
    public DataResult delPatent(@PathVariable("id") Integer id) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(patentService.delPatent(id));
        return dataResult;
    }

    @PostMapping("/cretePatent")
    @ResponseBody
    public DataResult createPatent(@RequestBody Patent request) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(patentService.createPatent(request));
        return dataResult;
    }

    @PostMapping("/updatePatent")
    @ResponseBody
    public DataResult updatePatent(@RequestBody Patent request) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(patentService.updatePatent(request));
        return dataResult;
    }

}

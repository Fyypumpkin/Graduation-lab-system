package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.entity.Project;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.request.CreateProjectRequest;
import cn.fyypumpkin.manage.lab.request.GetPrjListRequest;
import cn.fyypumpkin.manage.lab.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class ProjectController {
    @Resource
    private ProjectService service;

    @PostMapping("/createPrj")
    @ResponseBody
    public DataResult createPrj(@RequestBody CreateProjectRequest request) {

        DataResult dataResult = new DataResult();
        dataResult.setSuccess(service.createPrj(request));
        return dataResult;
    }

    @PostMapping("/getPrjInfo/{id}")
    @ResponseBody
    public DataResult createPrj(@PathVariable("id") Integer id) {

        DataResult dataResult = new DataResult();
        dataResult.setData(service.getPrjInfoById(id));
        dataResult.setSuccess(true);
        return dataResult;
    }

    @PostMapping("/getPrjList")
    @ResponseBody
    public PageResult getPrjList(@RequestBody GetPrjListRequest request) {

        PageResult dataResult = new PageResult<>();
        dataResult.setData(service.getPrjList(request));
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        pageInfo.setTotalNum(service.prjListCount(request));
        dataResult.setPageInfo(pageInfo);
        return dataResult;
    }



    @PostMapping("/delPrjInfo/{id}")
    @ResponseBody
    public DataResult getPrjList(@PathVariable("id") Integer id) {
        DataResult dataResult = new DataResult();
        dataResult.setData(service.delPrjInfoById(id));
        dataResult.setSuccess(true);
        return dataResult;
    }


    @PostMapping("/modifyPrj")
    @ResponseBody
    public DataResult modifyPrj(@RequestBody Project request) {
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(service.modifyPrj(request));
        return dataResult;
    }





}

package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.ThesisDTO;
import cn.fyypumpkin.manage.lab.entity.Thesis;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.request.GetThesisListRequest;
import cn.fyypumpkin.manage.lab.request.ModifyThesisInfoRequest;
import cn.fyypumpkin.manage.lab.service.ThesisService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class ThesisController {
    @Resource
    private ThesisService thesisService;

    @PostMapping("/getThesisList")
    @ResponseBody
    public PageResult getThesisList(@RequestBody GetThesisListRequest request) {
        PageResult dataResult = new PageResult();
        List<ThesisDTO> result = thesisService.getThesisList(request);
        dataResult.setSuccess(true);
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        pageInfo.setTotalNum(thesisService.thesisListCount(request));
        dataResult.setData(result);
        dataResult.setPageInfo(pageInfo);

        return dataResult;
    }

    @PostMapping("/getThesisInfo/{id}")
    @ResponseBody
    public DataResult getThesisInfo(@PathVariable("id") Integer id) {
        DataResult dataResult = new DataResult();
        Thesis thesis = thesisService.getThesisInfo(id);
        dataResult.setData(thesis);
        dataResult.setSuccess(true);
        return dataResult;
    }

    @PostMapping("/modifyThesisInfo")
    @ResponseBody
    public DataResult modifyThesisInfo(@RequestBody ModifyThesisInfoRequest request) {
        DataResult dataResult = new DataResult();
        Boolean update = false;
        try {
            update = thesisService.modifyThesisInfo(request);
            dataResult.setSuccess(update);
        } catch (Exception e) {
            dataResult.setSuccess(false);
        }
        if (!update) {
            dataResult.setMessage("更新失败");
        }
        return dataResult;
    }

    @PostMapping("/delThesisInfo/{id}")
    @ResponseBody
    public DataResult delThesisInfo(@PathVariable("id") Integer id) {
        DataResult dataResult = new DataResult();
        Boolean del = false;
        try {
            del = thesisService.delThesisInfo(id);
            dataResult.setSuccess(del);
        } catch (Exception e) {
            dataResult.setSuccess(false);
        }
        if (!del) {
            dataResult.setMessage("删除失败");
        }
        return dataResult;
    }

    @PostMapping("/createThesisInfo")
    @ResponseBody
    public DataResult createThesisInfo(@RequestBody ModifyThesisInfoRequest request) {
        DataResult dataResult = new DataResult();
        Boolean insert = false;
        try {
            insert = thesisService.createThesisInfo(request);
            dataResult.setSuccess(insert);
        } catch (Exception e) {
            dataResult.setSuccess(false);
        }
        if (!insert) {
            dataResult.setMessage("新增失败");
        }
        return dataResult;
    }

}

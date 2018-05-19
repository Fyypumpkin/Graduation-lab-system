package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.CopyrightListDTO;
import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;
import cn.fyypumpkin.manage.lab.request.DelCopyrightRequest;
import cn.fyypumpkin.manage.lab.request.GetCopyrightInfoRequest;
import cn.fyypumpkin.manage.lab.request.GetCopyrightListRequest;
import cn.fyypumpkin.manage.lab.service.CopyrightService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class CopyRightController {
    @Resource
    private CopyrightService copyrightService;

    @PostMapping("/getCopyrightList")
    @ResponseBody
    public PageResult getCopyrightList(@RequestBody GetCopyrightListRequest request) {
        PageResult pageresult = new PageResult();
        List<CopyrightListDTO> result = copyrightService.getCopyrightList(request);
        pageresult.setSuccess(true);
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        pageInfo.setTotalNum(copyrightService.copyrightListCount(request));
        pageresult.setData(result);
        pageresult.setPageInfo(pageInfo);

        return pageresult;
    }

    @PostMapping("/delCopyright")
    @ResponseBody
    public DataResult delCopyright(@RequestBody DelCopyrightRequest request) {
        if (request.getDeleteable() >= 1) {
            DataResult result = new DataResult();
            // TODO 删除著作权信息
            return result;
        }
        return ResultUtils.wrapFailure(400, "无权删除");
    }

    @PostMapping("/getCopyrightInfo")
    @ResponseBody
    public DataResult getCopyrightInfo(@RequestBody GetCopyrightInfoRequest request) {
        DataResult dataResult = new DataResult();
        try {
            return ResultUtils.wrapSuccess(copyrightService.getCopyrightInfo(request));
        } catch (Exception e) {
            dataResult.setSuccess(false);
            dataResult.setMessage("读取信息失败");
        }
        return dataResult;
    }
}

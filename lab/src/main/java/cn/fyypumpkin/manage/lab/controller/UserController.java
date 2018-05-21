package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.PageInfo;
import cn.fyypumpkin.manage.lab.lib.result.PageResult;
import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;
import cn.fyypumpkin.manage.lab.request.ModifyUserRequest;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import cn.fyypumpkin.manage.lab.request.UserListRequest;
import cn.fyypumpkin.manage.lab.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author fyypumpkin on 2018/5/19.
 */

@Controller
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping("/register")
    @ResponseBody
    public DataResult register(@RequestBody RegisterRequest registerRequest) {
        try {
            Boolean success = userService.register(registerRequest);
            DataResult dataResult = new DataResult();
            dataResult.setSuccess(success);
            return dataResult;
        } catch (Exception e) {
            return ResultUtils.wrapFailure(400, "用户已存在");
        }

    }

    @PostMapping("/getUserList")
    @ResponseBody
    public PageResult getUserList(@RequestBody UserListRequest request) {
        PageResult dataResult = new PageResult();
        List<UserDTO> result = userService.getUserList(request);
        dataResult.setSuccess(true);
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPage(request.getPage());
        pageInfo.setPageSize(request.getPageSize());
        pageInfo.setTotalNum(userService.userListCount(request));
        dataResult.setData(result);
        dataResult.setPageInfo(pageInfo);

        return dataResult;
    }

    @PostMapping("/getAllUserList")
    @ResponseBody
    public DataResult getAllUserList() {
        DataResult dataResult = new DataResult();
        List<UserDTO> result = userService.getAllUserList();
        dataResult.setSuccess(true);
        dataResult.setData(result);
        return dataResult;
    }

    @PostMapping("/modifyUser")
    @ResponseBody
    public DataResult modifyUser(@RequestBody ModifyUserRequest request) {

        DataResult dataResult = new DataResult();
        dataResult.setData(userService.modifyUser(request));
        return dataResult;
    }

}

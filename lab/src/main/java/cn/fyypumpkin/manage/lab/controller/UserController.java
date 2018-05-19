package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.request.RegisterRequest;
import cn.fyypumpkin.manage.lab.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

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
        Boolean success = userService.register(registerRequest);
        DataResult dataResult = new DataResult();
        dataResult.setSuccess(success);
        return dataResult;
    }
}

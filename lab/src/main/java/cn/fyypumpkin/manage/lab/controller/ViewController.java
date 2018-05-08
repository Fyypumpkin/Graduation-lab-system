package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.LoginDTO;
import cn.fyypumpkin.manage.lab.request.LoginRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author fyypumpkin on 2018/5/5.
 */
@Controller
public class ViewController {

    @PostMapping
    public LoginDTO login(LoginRequest request) {

        return null;
    }
}

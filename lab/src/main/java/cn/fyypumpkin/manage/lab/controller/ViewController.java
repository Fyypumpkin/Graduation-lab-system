package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.LoginDTO;
import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;
import cn.fyypumpkin.manage.lab.request.GetUserInfoRequest;
import cn.fyypumpkin.manage.lab.request.LoginRequest;
import cn.fyypumpkin.manage.lab.request.PassWdRequest;
import cn.fyypumpkin.manage.lab.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;


/**
 * @author fyypumpkin on 2018/5/5.
 */
@Controller
public class ViewController {

    @Resource
    private UserService service;

    @PostMapping("/login")
    @ResponseBody
    public DataResult login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String passWd = request.getPassWd();
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        User user = service.getUserByUsername(username);
        if (user != null) {
            if (user.getLocked()) {
                return ResultUtils.wrapFailure(500, "用户被锁定");
            }
            if (user.getPassWd().equals(passWd)) {
                session.setAttribute("username", username);
                session.setAttribute("realName", user.getRealName());
                session.setAttribute("role", user.getRole());
                session.setAttribute("user", user);

                UsernamePasswordToken token = new UsernamePasswordToken(username, passWd);
                subject.login(token);
                return ResultUtils.wrapSuccess(new LoginDTO() {{
                    setUsername(username);
                    setRealName(user.getRealName());
                    setRole(user.getRole());
                }});
            } else {
                return ResultUtils.wrapFailure(400, "密码错误");
            }
        } else {
            return ResultUtils.wrapFailure(500, "用户未注册");
        }
    }

    @PostMapping("/logout")
    @ResponseBody
    public DataResult logout() {
        try {
            Subject subject = SecurityUtils.getSubject();
            subject.logout();
            DataResult<Boolean> dataResult = new DataResult<>();
            dataResult.setData(true);
            return ResultUtils.wrapSuccess(dataResult);
        } catch (Exception e) {
            return ResultUtils.wrapFailure(500, "登出出错");
        }
    }

    @PostMapping("/check")
    @ResponseBody
    public DataResult checkLogin() {
        if (SecurityUtils.getSubject().getSession().getAttribute("user") != null) {
            return ResultUtils.wrapSuccess(new LoginDTO() {{
                setRealName((String) (SecurityUtils.getSubject().getSession().getAttribute("realName")));
                setUsername((String) (SecurityUtils.getSubject().getSession().getAttribute("username")));
                setRole((Integer) (SecurityUtils.getSubject().getSession().getAttribute("role")));
            }});
        }
        return ResultUtils.wrapFailure(500, "登陆检查失败");
    }

    @PostMapping("/changePassWd")
    @ResponseBody
    public DataResult changePassWd(@RequestBody PassWdRequest request) {
        if (SecurityUtils.getSubject().getSession().getAttribute("user") != null) {
            User user = service.getUserByUsername((String) (SecurityUtils.getSubject().getSession().getAttribute("username")));
            if (user.getPassWd().equals(request.getOldPassWd())) {
                DataResult result = new DataResult();
                result.setSuccess(service.changePasswd(request.getNewPassWd(), user.getUsername()));
                return result;
            }
            return ResultUtils.wrapFailure(500, "原密码错误");
        }
        return ResultUtils.wrapFailure(500, "用户异常");
    }

    @PostMapping("/getUserInfo")
    @ResponseBody
    public DataResult getUserInfo(@RequestBody GetUserInfoRequest request) {
        if (SecurityUtils.getSubject().getSession().getAttribute("user") != null) {
            int role = request.getRole();
            if (role == 0) {
                if (request.getCurrentUser().equals(request.getUsername())) {
                    User user = service.getUserByUsername(request.getUsername());
                    UserDTO userDTO = new UserDTO() {{
                        setUsername(user.getUsername());
                        setRealName(user.getRealName());
                        setPhone(user.getPhone());
                        setCollege(user.getCollege());
                        setSex(user.getSex());
                    }};
                    return ResultUtils.wrapSuccess(userDTO);
                } else {
                    return ResultUtils.wrapFailure(400, "权限不足");
                }
            } else {
                User user = service.getUserByUsername(request.getUsername());
                UserDTO userDTO = new UserDTO() {{
                    setUsername(user.getUsername());
                    setRealName(user.getRealName());
                    setPhone(user.getPhone());
                    setCollege(user.getCollege());
                    setSex(user.getSex());
                }};
                return ResultUtils.wrapSuccess(userDTO);
            }
        }

        return ResultUtils.wrapFailure(400, "用户状态异常");
    }

}

package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.LoginDTO;
import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.result.DataResult;
import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;
import cn.fyypumpkin.manage.lab.request.LoginRequest;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * @author fyypumpkin on 2018/5/5.
 */
@Controller
public class ViewController {

    @PostMapping("/login")
    @ResponseBody
    public DataResult login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String passWd = request.getPassWd();
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        User user = new User();
        user.setUsername(username);
        user.setPassWd(passWd);
        user.setLocked(false);
        // TODO 数据库校验用户名密码
        if (user != null) {
            if (user.getLocked()) {
                return ResultUtils.wrapFailure(500, "用户被锁定");
            }
            session.setAttribute("username", username);
            session.setAttribute("role", 2);
            session.setAttribute("user", user);

            UsernamePasswordToken token = new UsernamePasswordToken(username, passWd);
            subject.login(token);
            return ResultUtils.wrapSuccess(new LoginDTO() {{
                setUsername(username);
                setRealName("傅垚尧");
                setRole(2);
            }});
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
        if(SecurityUtils.getSubject().getSession().getAttribute("user") != null){
            return ResultUtils.wrapSuccess(new LoginDTO(){{
                setRealName("傅垚尧");
                setUsername((String) (SecurityUtils.getSubject().getSession().getAttribute("username")));
                setRole((Integer) (SecurityUtils.getSubject().getSession().getAttribute("role")));
            }});
        }
        return ResultUtils.wrapFailure(500, "登陆检查失败");
    }
}

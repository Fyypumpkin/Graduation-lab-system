package cn.fyypumpkin.manage.lab.filter;

import cn.fyypumpkin.manage.lab.entity.User;
import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.AccessControlFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * 用于检查登录状态
 *
 * @author fyypumpkin on 2018/5/14.
 */

@Slf4j
public class ShiroLoginFilter extends AccessControlFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest servletRequest, ServletResponse servletResponse, Object o) throws Exception {
        return false;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
        return false;
    }

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        System.out.println(SecurityUtils.getSubject());
        if (
                httpServletRequest.getServletPath().contains("/login")
                || httpServletRequest.getServletPath().contains("/logout")
                || httpServletRequest.getServletPath().contains("/check"))
            return true;
        User user = (User) SecurityUtils.getSubject().getSession().getAttribute("user");
        if (user == null) {
            JSONObject object = (JSONObject) JSON.toJSON(ResultUtils.wrapFailure(110110, "会话失效"));
            PrintWriter printWriter = httpServletResponse.getWriter();
            printWriter.append(object.toJSONString());
            return false;
        }
        return true;
    }
}

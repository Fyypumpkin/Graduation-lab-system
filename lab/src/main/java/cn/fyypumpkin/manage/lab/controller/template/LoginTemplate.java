package cn.fyypumpkin.manage.lab.controller.template;

import cn.fyypumpkin.manage.lab.lib.result.BaseResult;

/**
 * @author fyypumpkin on 2018/5/14.
 */

public class LoginTemplate {
    public void excute(BaseResult baseResult, ServiceCallback callback) {
        try {
            if (callback.doCheck()) {
                callback.doService();
            } else {
                baseResult = (BaseResult) callback.doError();
            }
        } catch (Exception e) {
            baseResult.setSuccess(false);
            baseResult.setMessage("登陆模板执行错误");
        }
    }
}

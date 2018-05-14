package cn.fyypumpkin.manage.lab.controller.template;

import cn.fyypumpkin.manage.lab.lib.result.DataResult;

/**
 * @author fyypumpkin on 2018/5/14.
 */

interface ServiceCallback {
    void doService();

    boolean doCheck();

    Object doError();
}

package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.lib.result.ResultUtils;

import java.util.HashMap;

/**
 * @author fyypumpkin on 2018/5/8.
 */

public class test {
    public static void main(String[] args) {
        HashMap map = new HashMap();
        map.put(null, "aa");
        System.out.println(map.get(null));
        System.out.println(ResultUtils.wrapFailure(300, "haha"));
    }
}

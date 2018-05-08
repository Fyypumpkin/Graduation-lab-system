package cn.fyypumpkin.manage.lab.lib.result;

import java.util.List;

/**
 * @author fyypumpkin on 2018/5/8.
 */
public interface ResultUtils {
    static DataResult defaultSuccess() {
        DataResult result = new DataResult();
        return result;
    }

    static <T> DataResult<T> wrapSuccess(T data) {
        DataResult<T> result = new DataResult();
        result.setData(data);
        return result;
    }

    static <T> PageResult<T> wrapSuccess(List<T> list, int page, int pageSize, long totalNum) {
        PageInfo pageInfo = new PageInfo(page, pageSize, totalNum);
        PageResult<T> result = new PageResult();
        result.setData(list);
        result.setPageInfo(pageInfo);
        return result;
    }

    static DataResult wrapFailure(int code, String message) {
        DataResult result = new DataResult();
        result.setErrorMessage(code, message);
        return result;
    }

    static PageResult wrapPageResultFailure(int code, String message) {
        PageResult result = new PageResult();
        result.setErrorMessage(code, message);
        return result;
    }

    static DataResult wrapFailure(Class<? extends DataResult> resultType, int code, String message) {
        DataResult result = null;

        try {
            result = (DataResult) resultType.newInstance();
        } catch (InstantiationException var5) {
            var5.printStackTrace();
        } catch (IllegalAccessException var6) {
            var6.printStackTrace();
        }

        result.setErrorMessage(code, message);
        return result;
    }
}

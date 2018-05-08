package cn.fyypumpkin.manage.lab.lib.result;

import cn.fyypumpkin.manage.lab.lib.response.CommonResultCode;
import cn.fyypumpkin.manage.lab.lib.response.IErrorCode;

import java.io.Serializable;

/**
 * @author fyypumpkin on 2018/5/8.
 */

public class BaseResult implements Serializable {
    private static final long serialVersionUID = 1949910043360896391L;
    private boolean success;
    private int code;
    private String message;
    private String requestId;

    public BaseResult() {
        this.code = CommonResultCode.SUCCESS.code;
        this.success = true;
        this.message = CommonResultCode.SUCCESS.message;
    }

    public <R extends BaseResult> R setErrorMessage(int code, String message) {
        this.code = code;
        this.success = false;
        this.message = message;
        return (R) this;
    }

    public <R extends BaseResult> R setErrorMessage(IErrorCode code, Object... args) {
        this.code = code.getCode();
        this.success = false;
        this.message = String.format(code.getMessage(), args);
        return (R) this;
    }

    public <R extends BaseResult> R setError(CommonResultCode rc, Object... args) {
        this.code = rc.code;
        this.success = false;
        if (args != null && args.length != 0) {
            this.message = String.format(rc.message, args);
        } else {
            this.message = rc.message;
        }

        return (R) this;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getCode() {
        return this.code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRequestId() {
        return this.requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    @Override
    public String toString() {
        return "success: " + success + " code: " + code + " message: " + message;
    }
}

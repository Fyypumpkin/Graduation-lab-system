package cn.fyypumpkin.manage.lab.lib.result;

/**
 * @author fyypumpkin on 2018/5/8.
 */

public class DataResult<T> extends BaseResult {
    private T data;

    public DataResult() {
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String toString() {
        return "DataResult(super=" + super.toString() + ", data=" + this.getData() + ")";
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof DataResult)) {
            return false;
        } else {
            DataResult<?> other = (DataResult) o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$data = this.getData();
                Object other$data = other.getData();
                if (this$data == null) {
                    if (other$data != null) {
                        return false;
                    }
                } else if (!this$data.equals(other$data)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof DataResult;
    }

    public int hashCode() {
        int result = 1;
        Object $data = this.getData();
        result = result * 59 + ($data == null ? 43 : $data.hashCode());
        return result;
    }
}

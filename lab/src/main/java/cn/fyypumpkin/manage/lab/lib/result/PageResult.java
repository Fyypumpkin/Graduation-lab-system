package cn.fyypumpkin.manage.lab.lib.result;

import java.util.List;

/**
 * @author fyypumpkin on 2018/5/8.
 */
public class PageResult<T> extends DataResult<List<T>> {
    private PageInfo pageInfo;

    public PageResult() {
    }

    public PageInfo getPageInfo() {
        return this.pageInfo;
    }

    public void setPageInfo(PageInfo pageInfo) {
        this.pageInfo = pageInfo;
    }

    public String toString() {
        return "PageResult(super=" + super.toString() + ", pageInfo=" + this.getPageInfo() + ")";
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof PageResult)) {
            return false;
        } else {
            PageResult<?> other = (PageResult) o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$pageInfo = this.getPageInfo();
                Object other$pageInfo = other.getPageInfo();
                if (this$pageInfo == null) {
                    if (other$pageInfo != null) {
                        return false;
                    }
                } else if (!this$pageInfo.equals(other$pageInfo)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof PageResult;
    }

    public int hashCode() {
        int result = 1;
        Object $pageInfo = this.getPageInfo();
        result = result * 59 + ($pageInfo == null ? 43 : $pageInfo.hashCode());
        return result;
    }
}

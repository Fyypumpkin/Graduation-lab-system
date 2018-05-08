package cn.fyypumpkin.manage.lab.lib.result;

/**
 * @author fyypumpkin on 2018/5/8.
 */

import java.io.Serializable;

public class PageInfo implements Serializable {
    private static final long serialVersionUID = -5073276071155636598L;
    private int page;
    private int pageSize;
    private long totalNum;

    public int getTotalPage() {
        int totalPage = (int)Math.ceil(1.0D * (double)this.totalNum / (double)this.pageSize);
        return totalPage == 0 ? 1 : totalPage;
    }

    public PageInfo(int page, int pageSize, long totalNum) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalNum = totalNum;
    }

    public int getPage() {
        return this.page;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public long getTotalNum() {
        return this.totalNum;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setTotalNum(long totalNum) {
        this.totalNum = totalNum;
    }

    public String toString() {
        return "PageInfo(page=" + this.getPage() + ", pageSize=" + this.getPageSize() + ", totalNum=" + this.getTotalNum() + ")";
    }

    public PageInfo() {
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof PageInfo)) {
            return false;
        } else {
            PageInfo other = (PageInfo)o;
            if (!other.canEqual(this)) {
                return false;
            } else if (this.getPage() != other.getPage()) {
                return false;
            } else if (this.getPageSize() != other.getPageSize()) {
                return false;
            } else {
                return this.getTotalNum() == other.getTotalNum();
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof PageInfo;
    }

    public int hashCode() {
        int result = 1;
        result = result * 59 + this.getPage();
        result = result * 59 + this.getPageSize();
        long $totalNum = this.getTotalNum();
        result = result * 59 + (int)($totalNum >>> 32 ^ $totalNum);
        return result;
    }
}

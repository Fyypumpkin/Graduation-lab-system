package cn.fyypumpkin.manage.lab.request;

public class DelCopyrightRequest {
    private Integer deleteable;

    private Integer id;

    public Integer getDeleteable() {
        return deleteable;
    }

    public void setDeleteable(Integer deleteable) {
        this.deleteable = deleteable;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

package cn.fyypumpkin.manage.lab.dto.export;

public class Patent {
    private String username;
    private String name;
    private String patentNo;
    private String noticeNo;
    private String ipc;
    private String patentIntro;
    private String patentOriginNo;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPatentNo() {
        return patentNo;
    }

    public void setPatentNo(String patentNo) {
        this.patentNo = patentNo;
    }

    public String getNoticeNo() {
        return noticeNo;
    }

    public void setNoticeNo(String noticeNo) {
        this.noticeNo = noticeNo;
    }

    public String getIpc() {
        return ipc;
    }

    public void setIpc(String ipc) {
        this.ipc = ipc;
    }

    public String getPatentIntro() {
        return patentIntro;
    }

    public void setPatentIntro(String patentIntro) {
        this.patentIntro = patentIntro;
    }

    public String getPatentOriginNo() {
        return patentOriginNo;
    }

    public void setPatentOriginNo(String patentOriginNo) {
        this.patentOriginNo = patentOriginNo;
    }
}

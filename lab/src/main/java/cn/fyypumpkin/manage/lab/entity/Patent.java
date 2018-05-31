package cn.fyypumpkin.manage.lab.entity;

import java.util.Date;

public class Patent {
    private Integer id;
    private String username;
    private String name;
    private String patentNo;
    private String noticeNo;
    private String ipc;
    private String patentIntro;
    private String url;
    private String patentOriginNo;
    private Date awardTime;

    public Date getAwardTime() {
        return awardTime;
    }

    public void setAwardTime(Date awardTime) {
        this.awardTime = awardTime;
    }

    public String getPatentOriginNo() {
        return patentOriginNo;
    }

    public void setPatentOriginNo(String patentOriginNo) {
        this.patentOriginNo = patentOriginNo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

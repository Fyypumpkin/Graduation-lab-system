package cn.fyypumpkin.manage.lab.dto.export;

import java.util.List;

public class PrjE {
    private String username;
    private String name;
    private String intro;
    private String completeTime;
    private String startTime;
    private String doingTime;
    private String status;
    private String headPeople;
    private List<PrjT> dev;
    private String money;
    private String moneyFrom;
    private String labType;
    private String rank;

    public PrjE() {
    }

    public PrjE(String username, String name, String intro, String completeTime, String startTime, String doingTime, String status, String headPeople, List<PrjT> dev, String money, String moneyFrom, String labType, String rank) {
        this.username = username;
        this.name = name;
        this.intro = intro;
        this.completeTime = completeTime;
        this.startTime = startTime;
        this.doingTime = doingTime;
        this.status = status;
        this.headPeople = headPeople;
        this.dev = dev;
        this.money = money;
        this.moneyFrom = moneyFrom;
        this.labType = labType;
        this.rank = rank;
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

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(String completeTime) {
        this.completeTime = completeTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getDoingTime() {
        return doingTime;
    }

    public void setDoingTime(String doingTime) {
        this.doingTime = doingTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHeadPeople() {
        return headPeople;
    }

    public void setHeadPeople(String headPeople) {
        this.headPeople = headPeople;
    }

    public List<PrjT> getDev() {
        return dev;
    }

    public void setDev(List<PrjT> dev) {
        this.dev = dev;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getMoneyFrom() {
        return moneyFrom;
    }

    public void setMoneyFrom(String moneyFrom) {
        this.moneyFrom = moneyFrom;
    }

    public String getLabType() {
        return labType;
    }

    public void setLabType(String labType) {
        this.labType = labType;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }
}

package cn.fyypumpkin.manage.lab.request.export;

import java.util.Date;

public class OutputWinRequest {
    private String name;
    private String[] people;
    private Date start;
    private Date stop;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getPeople() {
        return people;
    }

    public void setPeople(String[] people) {
        this.people = people;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getStop() {
        return stop;
    }

    public void setStop(Date stop) {
        this.stop = stop;
    }
}

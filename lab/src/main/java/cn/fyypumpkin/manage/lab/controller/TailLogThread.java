package cn.fyypumpkin.manage.lab.controller;

import javax.websocket.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @author fyypumpkin on 2018/5/7.
 */
public class TailLogThread extends Thread {
    private BufferedReader reader;
    private Session session;

    public TailLogThread(InputStream in, Session session){
        this.reader = new BufferedReader(new InputStreamReader(in));
        this.session = session;
    }

    @Override
    public void run() {
        String line;
        try {
            while((line = reader.readLine()) != null) {
                session.getBasicRemote().sendText(line + "\n");
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

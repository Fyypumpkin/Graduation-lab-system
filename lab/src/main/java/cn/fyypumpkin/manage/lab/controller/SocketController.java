//package cn.fyypumpkin.manage.lab.controller;
//
//import org.springframework.stereotype.Component;
//
//import javax.websocket.OnClose;
//import javax.websocket.OnError;
//import javax.websocket.OnOpen;
//import javax.websocket.Session;
//import javax.websocket.server.ServerEndpoint;
//import java.io.InputStream;
//
///**
// * @author fyypumpkin on 2018/5/7.
// */
//@ServerEndpoint(value = "/mylog")
//@Component
//public class SocketController {
//    private Process process;
//    private InputStream inputStream;
//
//    @OnOpen
//    public void onOpen(Session session) {
//        try {
//            process = Runtime.getRuntime().exec("tail -f /usr/local/Cellar/nginx/1.13.10/logs/nginx.log");
//            inputStream = process.getInputStream();
//
//            TailLogThread tailLogThread = new TailLogThread(inputStream, session);
//            tailLogThread.start();
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//    }
//
//    @OnClose
//    public void onClose() {
//        try {
//            if (inputStream != null)
//                inputStream.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        if (process != null)
//            process.destroy();
//    }
//
//    @OnError
//    public void onError(Throwable thr) {
//        thr.printStackTrace();
//    }
//}

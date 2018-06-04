package cn.fyypumpkin.manage.lab.service;

import cn.fyypumpkin.manage.lab.dao.OutputDao;
import cn.fyypumpkin.manage.lab.dto.UserDTO;
import cn.fyypumpkin.manage.lab.dto.export.*;
import cn.fyypumpkin.manage.lab.request.export.OutputPatentRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputPrjRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputThesisRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputWinRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class OutputService {
    @Resource
    private OutputDao outputDao;

    public List<Object> getAllUserList() {
        List<Object> list = outputDao.getAllUserList();
        List<Object> result = new ArrayList<>();
//        list.forEach(item -> {
//            cn.fyypumpkin.manage.lab.dto.export.User user = new cn.fyypumpkin.manage.lab.dto.export.User() {{
//                setCollege(((UserDTO) item).getCollege());
//                setPhone(((UserDTO) item).getPhone());
//                setRealName(((UserDTO) item).getRealName());
//                setUsername(((UserDTO) item).getUsername());
//                setSex(((((UserDTO) item).getSex()) == 1) ? "男" : "女");
//            }};
//            result.add(user);
//        });
        for (int i = 0; i < list.size(); i++) {
            cn.fyypumpkin.manage.lab.dto.export.User user = new cn.fyypumpkin.manage.lab.dto.export.User();
            user.setCollege(((UserDTO) list.get(i)).getCollege());
            user.setPhone(((UserDTO) list.get(i)).getPhone());
            user.setRealName(((UserDTO) list.get(i)).getRealName());
            user.setUsername(((UserDTO) list.get(i)).getUsername());
            user.setSex(((((UserDTO) list.get(i)).getSex()) == 1) ? "男" : "女");
            result.add(user);
        }
        return result;
    }

    public List<Object> getPatentList(OutputPatentRequest request) {
        List<Object> list = outputDao.getPatentList(request);
        List<Object> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            String username = outputDao.getRealName(((Patent) (list.get(i))).getUsername());
            Patent patent = new Patent();
            patent.setIpc(((Patent) (list.get(i))).getIpc());
            patent.setName(((Patent) (list.get(i))).getName());
            patent.setNoticeNo(((Patent) (list.get(i))).getNoticeNo());
            patent.setPatentIntro(((Patent) (list.get(i))).getPatentIntro());
            patent.setPatentOriginNo(((Patent) (list.get(i))).getPatentOriginNo());
            patent.setUsername(username);
            patent.setPatentNo(((Patent) (list.get(i))).getPatentNo());
            result.add(patent);
        }

        return result;
    }

    public List<Object> getWinList(OutputWinRequest request) {
        List<Object> list = outputDao.getWinList(request);
        List<Object> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            String username = outputDao.getRealName(((Win) (list.get(i))).getUsername());
            Win win = new Win();
            win.setUsername(username);
            win.setWinInst(((Win) (list.get(i))).getWinInst());
            win.setWinName(((Win) (list.get(i))).getWinName());
            win.setWinRank(((Win) (list.get(i))).getWinRank());
            win.setWinTime(((Win) (list.get(i))).getWinTime());
            result.add(win);
        }
        return result;
    }

    public List<Object> getThesisList(OutputThesisRequest request) {
        List<Object> list = outputDao.getThesisList(request);
        List<Object> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            Thesis thesis = new Thesis();
            thesis.setFirstAuthor(((Thesis) (list.get(i))).getFirstAuthor());
            thesis.setJournalFrom(((Thesis) (list.get(i))).getJournalFrom());
            thesis.setJournalName(((Thesis) (list.get(i))).getJournalName());
            thesis.setName(((Thesis) (list.get(i))).getName());
            thesis.setOtherAuthor(((Thesis) (list.get(i))).getOtherAuthor());
            thesis.setPage(((Thesis) (list.get(i))).getPage());
            thesis.setPublishTime(((Thesis) (list.get(i))).getPublishTime());
            thesis.setTeleAuthor(((Thesis) (list.get(i))).getTeleAuthor());
            thesis.setYear(((Thesis) (list.get(i))).getYear());
            thesis.setJournalType(((Thesis) (list.get(i))).getJournalType().equals("core") ? "核心期刊" : "非核心期刊");
            result.add(thesis);
        }
        return result;
    }

    public List<PrjE> getPrjList(OutputPrjRequest request) {
        List<Prj> lists = outputDao.getPrjList(request);
        List<PrjE> results = new ArrayList<>();
        for (int i = 0; i < lists.size(); i++) {
            String username = outputDao.getRealName(lists.get(i).getUsername());
            String headPeople = outputDao.getRealName(lists.get(i).getHeadPeople());
            List<PrjT> list = JSON.parseArray(lists.get(i).getDev(), PrjT.class);
            List<PrjT> list1 = new ArrayList<>();
            for (int j = 0; j < list.size(); j++) {
                PrjT prjT = new PrjT();
                prjT.setDesc((list.get(j)).getDesc());
                prjT.setPeople(outputDao.getRealName((list.get(j)).getPeople()));
                prjT.setPhone(outputDao.getPhone((list.get(j)).getPeople()));
                list1.add(prjT);
            }
            PrjE prjE = new PrjE();
            prjE.setCompleteTime(lists.get(i).getCompleteTime());
            prjE.setIntro(lists.get(i).getIntro());
            prjE.setLabType(lists.get(i).getLabType());
            prjE.setMoney(lists.get(i).getMoney());
            prjE.setMoneyFrom(lists.get(i).getMoneyFrom());
            prjE.setStartTime(lists.get(i).getStartTime());
            prjE.setName(lists.get(i).getName());
            prjE.setStatus(lists.get(i).getStatus());
            prjE.setRank(lists.get(i).getRank());
            prjE.setDoingTime(lists.get(i).getDoingTime());
            prjE.setHeadPeople(headPeople);
            prjE.setUsername(username);
            prjE.setDev(list1);
            results.add(prjE);

        }
        return results;
    }
}

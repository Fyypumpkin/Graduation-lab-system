package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.ThesisDao;
import cn.fyypumpkin.manage.lab.dto.ThesisDTO;
import cn.fyypumpkin.manage.lab.entity.Thesis;
import cn.fyypumpkin.manage.lab.request.GetThesisListRequest;
import cn.fyypumpkin.manage.lab.request.ModifyThesisInfoRequest;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ThesisRepository {
    @Resource
    private ThesisDao thesisDao;


    public List<ThesisDTO> getThesisList(GetThesisListRequest request) {
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        List<Thesis> list = thesisDao.getThesisList(request, offset, pageSize);
        List<ThesisDTO> result = new ArrayList<>();
        list.forEach(item -> {
            result.add(new ThesisDTO() {{
                setId(item.getId());
                setFirstAuthor(item.getFirstAuthor());
                setJournalName(item.getJournalName());
                setJournalSource(item.getJournalSource());
                setName(item.getName());
                setTeleAuthor(item.getTeleAuthor());
                setJournalFrom(item.getJournalFrom());
                setJournalType(item.getJournalType());
                setYear(item.getYear());
                setOtherAuthor(item.getOtherAuthor());
                setPage(item.getPage());
            }});
        });
        return result;
    }

    public int thesisListCount(GetThesisListRequest request) {
        return thesisDao.thesisListCount(request);
    }

    public Thesis getThesisInfo(Integer id) {
        return thesisDao.getThesisInfo(id);
    }

    public Boolean modifyThesisInfo(ModifyThesisInfoRequest request){
        return thesisDao.modifyThesisInfo(request) >= 1;
    }

    public Boolean createThesisInfo(ModifyThesisInfoRequest request){
        return thesisDao.createThesisInfo(request) >= 1;
    }

    public Boolean delThesisInfo(Integer request){
        return thesisDao.delThesisInfo(request) >= 1;
    }
}

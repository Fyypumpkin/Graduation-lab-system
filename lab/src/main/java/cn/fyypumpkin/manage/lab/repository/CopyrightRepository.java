package cn.fyypumpkin.manage.lab.repository;

import cn.fyypumpkin.manage.lab.dao.CopyrightDao;
import cn.fyypumpkin.manage.lab.dto.CopyrightDTO;
import cn.fyypumpkin.manage.lab.dto.CopyrightListDTO;
import cn.fyypumpkin.manage.lab.entity.Copyright;
import cn.fyypumpkin.manage.lab.entity.Extend;
import cn.fyypumpkin.manage.lab.entity.Origin;
import cn.fyypumpkin.manage.lab.request.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class CopyrightRepository {
    @Resource
    private CopyrightDao copyrightDao;

    public List<CopyrightListDTO> getCopyrightList(GetCopyrightListRequest request) {
        int offset = (request.getPage() - 1) * request.getPageSize();
        int pageSize = request.getPageSize();
        return copyrightDao.getCopyrightList(request, offset, pageSize);
    }

    public int copyrightListCount(GetCopyrightListRequest request) {
        return copyrightDao.copyrightListCount(request);
    }

    public CopyrightDTO getCopyrightInfo(GetCopyrightInfoRequest request) {
        Copyright copyright = copyrightDao.getCopyrightById(request.getId());
        List<Origin> origins = copyrightDao.getOriginsByKey(copyright.getOriginKey());
        List<Extend> extendList = copyrightDao.getExtendsByKey(copyright.getExtendKey());

        return new CopyrightDTO() {{
            setId(copyright.getId());
            setUsername(copyright.getUsername());
            setAllName(copyright.getAllName());
            setRange(copyright.getRange());
            setPower(copyright.getPower());
            setSimpleName(copyright.getSimpleName());
            setSortNo(copyright.getSortNo());
            setCompleteTime(copyright.getCompleteTime());
            setVersion(copyright.getVersion());
            setPublishTime(copyright.getPublishTime());
            setDevType(copyright.getDevType());
            setOrigin(origins);
            setExtend(extendList);
            setUsage(copyright.getUsage());
            setApplyUsername(copyright.getApplyUsername());
            setApplyPhone(copyright.getApplyPhone());
            setApplyAddress(copyright.getApplyAddress());
            setApplyPostcode(copyright.getApplyPostcode());
            setApplyIdNo(copyright.getApplyIdNo());
            setApplyMail(copyright.getApplyMail());
            setApplyFax(copyright.getApplyFax());
            setExtendUsername(copyright.getExtendUsername());
            setExtendPhone(copyright.getExtendPhone());
            setExtendAddress(copyright.getExtendAddress());
            setExtendPostcode(copyright.getExtendPostcode());
            setExtendIdNo(copyright.getExtendIdNo());
            setExtendMail(copyright.getExtendMail());
            setExtendFax(copyright.getExtendFax());
            setAttUrl(copyright.getAttUrl());
        }};
    }

    public int delCopyright(Integer id) {
        Copyright copyright = copyrightDao.getCopyrightById(id);
        String extend = copyright.getExtendKey();
        String origin = copyright.getOriginKey();
        copyrightDao.delCopyrightOrigin(origin);
        copyrightDao.delCopyrightExtend(extend);

        return copyrightDao.delCopyright(id);
    }

    @Transactional
    public Boolean createCopyrightInfo(CreateCopyrightRequest request) {
        List<ExtendRequest> extendList = request.getExtendRequestInfo();
        List<OriginRequest> originList = request.getOriginRequestInfo();

        if (extendList.size() > 0) {
            copyrightDao.createExtendInfo(extendList);
        }
        if (originList.size() > 0) {
            copyrightDao.createOriginInfo(originList);
        }

        return copyrightDao.createCopyrightInfo(request) >= 1;


    }
}

package cn.fyypumpkin.manage.lab.controller;

import cn.fyypumpkin.manage.lab.dto.export.PrjE;
import cn.fyypumpkin.manage.lab.export.ExcelUtils;
import cn.fyypumpkin.manage.lab.export.WordUtils;
import cn.fyypumpkin.manage.lab.request.export.OutputPatentRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputPrjRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputThesisRequest;
import cn.fyypumpkin.manage.lab.request.export.OutputWinRequest;
import cn.fyypumpkin.manage.lab.service.OutputService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@Controller
public class ExportController {

    @Resource
    private OutputService outputService;

    @PostMapping("/outputUsers")
    @ResponseBody
    public void outputUsers(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String columnsName[] = {"姓名", "性别", "用户名", "所在学院", "联系电话"};
        String columnsKey[] = {"realName", "sex", "username", "college", "phone"};
        List<Object> lists = outputService.getAllUserList();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ExcelUtils.createWorkBook(ExcelUtils.createExcelRecord(lists), columnsKey, columnsName).write(baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] content = baos.toByteArray();
        InputStream in = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(("用户信息列表" + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        ExportController.transfer(out, in);
    }

    @PostMapping("/outputPrjs")
    @ResponseBody
    public void outputPrj(HttpServletRequest request, HttpServletResponse response, @RequestBody OutputPrjRequest prjRequest) throws IOException {
        List<PrjE> lists = outputService.getPrjList(prjRequest);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        WordUtils.genDoc(lists).write(baos);
        byte[] content = baos.toByteArray();
        InputStream in = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(("用户信息列表" + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        ExportController.transfer(out, in);

    }

    @PostMapping("/outputPatents")
    @ResponseBody
    public void outputPatents(@RequestBody OutputPatentRequest patentRequest, HttpServletResponse response) throws IOException {
        String columnsName[] = {"专利名称", "专利申请人", "专利申请号", "专利号", "专利公开号", "专利分类", "专利简介"};
        String columnsKey[] = {"name", "username", "noticeNo", "patentOriginNo", "patentNo", "ipc", "patentIntro"};
        List<Object> lists = outputService.getPatentList(patentRequest);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ExcelUtils.createWorkBook(ExcelUtils.createExcelRecord(lists), columnsKey, columnsName).write(baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] content = baos.toByteArray();
        InputStream in = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(("专利信息列表" + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        ExportController.transfer(out, in);
    }

    @PostMapping("/outputThesis")
    @ResponseBody
    public void outputThesis(HttpServletRequest request, HttpServletResponse response, @RequestBody OutputThesisRequest thesisRequest) throws IOException {
        String columnsName[] = {"论文名称", "论文第一作者", "论文通讯作者", "论文其他作者", "期刊名称", "期刊页码", "期刊年份", "发表时间", "期刊类型", "收入名称"};
        String columnsKey[] = {"name", "firstAuthor", "teleAuthor", "otherAuthor", "journalName", "page", "year", "publishTime", "journalType", "journalFrom"};
        List<Object> lists = outputService.getThesisList(thesisRequest);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ExcelUtils.createWorkBook(ExcelUtils.createExcelRecord(lists), columnsKey, columnsName).write(baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] content = baos.toByteArray();
        InputStream in = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(("专利信息列表" + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        ExportController.transfer(out, in);
    }

    @PostMapping("/outputWins")
    @ResponseBody
    public void outputWins(HttpServletRequest request, HttpServletResponse response, @RequestBody OutputWinRequest winRequest) throws IOException {
        String columnsName[] = {"获奖名称", "获奖人", "授奖机构", "获奖等级", "获奖时间"};
        String columnsKey[] = {"winName", "username", "winInst", "winRank", "winTime"};
        List<Object> lists = outputService.getWinList(winRequest);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ExcelUtils.createWorkBook(ExcelUtils.createExcelRecord(lists), columnsKey, columnsName).write(baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] content = baos.toByteArray();
        InputStream in = new ByteArrayInputStream(content);
        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(("专利信息列表" + ".xls").getBytes(), "iso-8859-1"));
        ServletOutputStream out = response.getOutputStream();
        ExportController.transfer(out, in);
    }

    private static void transfer(ServletOutputStream out, InputStream in) throws IOException {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(in);
            bos = new BufferedOutputStream(out);
            byte[] buff = new byte[2048];
            int bytesRead;
            // Simple read/write loop.
            while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
                bos.write(buff, 0, bytesRead);
            }
        } catch (final IOException e) {
            throw e;
        } finally {
            if (bis != null)
                bis.close();
            if (bos != null)
                bos.close();
        }
    }

}

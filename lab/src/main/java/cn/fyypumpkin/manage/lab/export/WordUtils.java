package cn.fyypumpkin.manage.lab.export;


import cn.fyypumpkin.manage.lab.dto.export.PrjE;
import cn.fyypumpkin.manage.lab.dto.export.PrjT;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTcPr;

import java.io.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class WordUtils {
    public static void main(String[] args) throws IOException {
        List<PrjE> list = new ArrayList<>();
        list.add(new PrjE("1", "2", "3", "4", "5", "6", "7", "8", new ArrayList<>(), "10", "11", "12", "13"));
        list.add(new PrjE("1", "2", "3", "4", "5", "6", "7", "8", new ArrayList<>(), "10", "11", "12", "13"));
        list.add(new PrjE("1", "2", "3", "4", "5", "6", "7", "8", new ArrayList<>(), "10", "11", "12", "13"));
        genDoc(list);
    }

    public static XWPFDocument genDoc(List<PrjE> lists) throws IOException {
        XWPFDocument doc = new XWPFDocument();
        XWPFParagraph para, twoParagraph;
        XWPFRun run;
        // 标题
        String docTitle = "项目信息";
        XWPFParagraph titleParagraph = doc.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun T = titleParagraph.createRun();
        T.setFontFamily("仿宋");
        T.setText(docTitle);
        T.setColor("000000");
        T.setBold(true);
        T.setFontSize(20);
        XWPFParagraph paragraph1 = doc.createParagraph();
        XWPFRun paragraphRun1 = paragraph1.createRun();
        paragraphRun1.setText("\r");


        //添加文本
        for (int h = 0; h < lists.size(); h++) {
            paragraphRun1.setText("\r");
            // 添加二级标题
            twoParagraph = doc.createParagraph();
            twoParagraph.setAlignment(ParagraphAlignment.LEFT);
            XWPFRun two = twoParagraph.createRun();
            two.setFontFamily("仿宋");
            two.setBold(true);
            two.setText("\r" + lists.get(h).getName() + ":");
            two.setColor("000000");
            two.setFontSize(16);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    项目名称：");
            String content = lists.get(h).getName();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    项目简介：");
            String content1 = lists.get(h).getIntro();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setFontFamily("仿宋");
            run.setBold(false);
            run.setFontSize(12);
            run.setText(content1);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    立项日期：");
            String content3 = lists.get(h).getStartTime();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content3);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    启动日期：");
            String content4 = lists.get(h).getDoingTime();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content4);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    截止日期：");
            String content5 = lists.get(h).getCompleteTime();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content5);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    项目经费：");
            String content6 = lists.get(h).getMoney();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content6);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    经费来源：");
            String content7 = lists.get(h).getMoneyFrom();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content7);

            para = doc.createParagraph();
            two = para.createRun();
            two.setFontFamily("仿宋");
            two.setText("人员信息：");
            two.setColor("000000");
            two.setBold(true);
            two.setFontSize(16);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    立项人：");
            String content8 = lists.get(h).getUsername();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content8);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    项目负责人：");
            String content9 = lists.get(h).getHeadPeople();
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);
            run.setText(content9);

            para = doc.createParagraph();
            run = para.createRun();
            run.setBold(true);
            run.setFontSize(15);
            run.setText("    其他成员信息：");
            para.setAlignment(ParagraphAlignment.LEFT);//设置左对齐
            run.setBold(false);
            run.setFontFamily("仿宋");
            run.setFontSize(12);

//            doc.createParagraph();
            //添加表格
            int rows = lists.get(h).getDev().size();
            XWPFTable table = doc.createTable(rows, 3);
            table.setCellMargins(3, 5, 3, 5);
//        table.addNewCol();//添加新列
//        table.createRow();//添加新行
            String[] title = new String[]{"成员姓名", "成员联系方式", "成员任务"};
            String[] value = new String[]{"1", "2", "3"};
            List<PrjT> list = lists.get(h).getDev();
            XWPFTableRow row;
            XWPFTableCell cell;
            CTTcPr cellPr;
            for (int j = 0; j < rows; j++) {
                row = table.getRow(j);
//                row.setHeight(100);
                for (int i = 0; i < title.length; i++) {
                    cell = row.getCell(i);
                    cellPr = cell.getCTTc().addNewTcPr();
                    cellPr.addNewTcW().setW(BigInteger.valueOf(3000));
                    para = cell.getParagraphs().get(0);
                    para.setAlignment(ParagraphAlignment.CENTER);
                    run = para.createRun();
                    run.setFontFamily("仿宋");
                    run.setFontSize(11);
                    if (j == 0) {//标题
                        run.setBold(true);
                        run.setText(title[i]);
                    } else {
                        if (i == 0) {
                            run.setText(list.get(j).getPeople());
                        } else if(i == 1){
                            run.setText(list.get(j).getPhone());
                        } else {
                            run.setText(list.get(j).getDesc());
                        }
                    }
                }
            }

           doc.createParagraph();
           doc.createParagraph();

        }
        return doc;
    }
}

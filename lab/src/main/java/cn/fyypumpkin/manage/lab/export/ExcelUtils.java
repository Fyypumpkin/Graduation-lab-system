package cn.fyypumpkin.manage.lab.export;

import cn.fyypumpkin.manage.lab.entity.User;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

public class ExcelUtils {
    public static List<Map<String, Object>> createExcelRecord(List<Object> lists) {
        List<Map<String, Object>> result = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        map.put("sheetName", "sheet1");
        result.add(map);
        lists.forEach((item) -> {
            Object t = item;
            Map<String, Object> mapValue = new HashMap<String, Object>();
            Field[] filed = item.getClass().getDeclaredFields();
            for (int i = 0; i < filed.length; i++) {
                String fieldName = filed[i].getName();
                String getMethodName = "get"
                        + fieldName.substring(0, 1).toUpperCase()
                        + fieldName.substring(1);
                String columnsName = fieldName.substring(0, 1)
                        + fieldName.substring(1);
                System.out.println(getMethodName);
                try {
                    Class clazz = item.getClass();
                    Method method = clazz.getMethod(getMethodName, new Class[]{});
                    Object value = method.invoke(item, new Object[]{});
                    mapValue.put(columnsName, value);

                    System.out.println(value);
                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
            result.add(mapValue);
        });
        System.out.println(result);
        return result;
    }

    public static Workbook createWorkBook(List<Map<String, Object>> list, String[] keys, String columnNames[]) {
        // 创建工作薄
        Workbook workbook = new HSSFWorkbook();
        Sheet sheet = workbook.createSheet(list.get(0).get("sheetName").toString());
        for (int i = 0; i < keys.length; i++) {
            sheet.setColumnWidth(i, (int) (35.7 * 150));
        }

        Row row = sheet.createRow((int) 0);

        // 两种单元格格式
        CellStyle cs1 = workbook.createCellStyle();
        CellStyle cs2 = workbook.createCellStyle();

        // 两种字体
        Font f1 = workbook.createFont();
        Font f2 = workbook.createFont();

        // 创建第一种字体样式（用于列名）
        f1.setFontHeightInPoints((short) 10);
        f1.setColor(IndexedColors.BLACK.getIndex());
        f1.setBold(true);

        // 创建第二种字体样式（用于值）
        f2.setFontHeightInPoints((short) 10);
        f2.setColor(IndexedColors.BLACK.getIndex());

        // 设置第一种单元格的样式（用于列名）
        cs1.setFont(f1);
        cs1.setBorderLeft(BorderStyle.THIN);
        cs1.setBorderRight(BorderStyle.THIN);
        cs1.setBorderTop(BorderStyle.THIN);
        cs1.setBorderBottom(BorderStyle.THIN);
        cs1.setAlignment(HorizontalAlignment.CENTER);

        // 设置第二种单元格的样式（用于值）
        cs2.setFont(f2);
        cs2.setBorderLeft(BorderStyle.THIN);
        cs2.setBorderRight(BorderStyle.THIN);
        cs2.setBorderTop(BorderStyle.THIN);
        cs2.setBorderBottom(BorderStyle.THIN);
        cs2.setAlignment(HorizontalAlignment.CENTER);

        //设置列名
        for (int i = 0; i < columnNames.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columnNames[i]);
            cell.setCellStyle(cs1);
        }

        //设置每行每列的值
        for (short i = 1; i < list.size(); i++) {
            // Row 行,Cell 方格 , Row 和 Cell 都是从0开始计数的
            // 创建一行，在页sheet上
            Row row1 = sheet.createRow((short) i);
            // 在row行上创建一个方格
            for (short j = 0; j < keys.length; j++) {
                Cell cell = row1.createCell(j);
                cell.setCellValue(list.get(i).get(keys[j]) == null ? " " : list.get(i).get(keys[j]).toString());
                cell.setCellStyle(cs2);
            }
        }

        return workbook;

    }

    public static void main(String[] args) {
        User user = new User();
        user.setCollege("hha");
        List<Object> list = new ArrayList<>();
        list.add(user);
        createExcelRecord(list);
    }
}


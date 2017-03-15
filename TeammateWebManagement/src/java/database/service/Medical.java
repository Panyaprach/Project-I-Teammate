package database.service;

import static database.service.DataControl.DB_URL;
import static database.service.DataControl.JDBC_Driver;
import static database.service.DataControl.pass;
import static database.service.DataControl.user;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Medical implements DataControl {

    private int id;
    private String content;
    private String description;
    private int img_id;

    public Medical() {
    }

    public Medical(int id, String content, String description, int img_id) {
        this.id = id;
        this.content = content;
        this.description = description;
        this.img_id = img_id;
    }
    public void updateMedical(){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "Update medical SET content='"
                    + this.content + "', description ='" + this.description + "'"
                    + " WHERE m_id = " + this.id;
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Medical selectMedicalById(int mid) {
        Medical medical = null;
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM medical WHERE m_id = " + mid);
            while (rs.next()) {
                int id = rs.getInt(1);
                String content = rs.getString(2);
                String description = rs.getString(3);
                int image = rs.getInt(4);
                medical = new Medical(id, content, description, image);
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return medical;
    }

    public void insertMedical(String path) {
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "INSERT INTO medical (content,img_id,description) VALUES ('"
                    + content + "',"
                    + "(SELECT img_id FROM image WHERE path = '" + path.replace("\\", "\\\\") + "'),'"
                    + description + "'"
                    + ")";
            System.out.println(sql);
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteMedical(int id) {
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "DELETE FROM medical WHERE m_id = " + id;
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getImagePath() {
        return new Image().getImageById(this.img_id).getPath();
    }

    @Override
    public List getAllAttribute() {
        List<Medical> list = new ArrayList<Medical>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM medical");
            while (rs.next()) {
                int id = rs.getInt(1);
                String content = rs.getString(2);
                String description = rs.getString(3);
                int image = rs.getInt(4);
                Medical medical = new Medical(id, content, description, image);
                list.add(medical);
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return list;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getImg_id() {
        return img_id;
    }

    public void setImg_id(int img_id) {
        this.img_id = img_id;
    }

}

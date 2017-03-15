package database.service;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.util.List;

public class Image implements DataControl {

    private int id;
    private String path;

    public Image() {
    }

    public Image(int id, String path) {
        this.id = id;
        this.path = path;
    }
    
    public void insertImage(){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            System.out.println("INSERT INTO image (path) VALUES ('"+path.replace("\\", "\\\\")+"')");
            stmt.executeUpdate("INSERT INTO image (path) VALUES ('"+path.replace("\\", "\\\\")+"')");
            stmt.close();
            con.close();
        } catch(Exception e){
            e.printStackTrace();
        }
    }
    public Image getImageById(int id) {
        Image img = null;
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM image WHERE img_id = " + id);
            while(rs.next()) {
                img = new Image(
                        rs.getInt(1), //ID
                        rs.getString(2) //Path
                );
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return img;
    }

    @Override
    public List getAllAttribute() {
        List<Image> list = new ArrayList<Image>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM image");
            while (rs.next()) {
                int id = rs.getInt(1);
                String path = rs.getString(2);
                Image image = new Image(id, path);
                list.add(image);
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

}

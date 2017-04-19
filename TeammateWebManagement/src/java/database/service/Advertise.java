package database.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Advertise implements DataControl {

    private int id;
    private String content;
    private int img_id;
    private String description;
    private Date generate_date;
    private Date expired_date;

    public Advertise() {
    }

    public Advertise(int id, String content, int img_id, String description, Date generate_date,Date expired_date) {
        this.id = id;
        this.content = content;
        this.img_id = img_id;
        this.description = description;
        this.generate_date = generate_date;
        this.expired_date = expired_date;
    }

    public void updateAdvertise(Advertise ads){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "Update advertise SET content='" +
                    ads.content + "', description ='" + ads.description+"', " +
                    "expired_date = '"+ads.expired_date+"'"
                    + " WHERE ads_id = "+ads.id;
            System.out.println(sql);
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public Advertise selectAdvertiseById(int id){
        Advertise ads = null;
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM advertise WHERE ads_id = "+id);
            while (rs.next()) {
                ads = new Advertise(
                        rs.getInt(1), //Id
                        rs.getString(2), //content
                        rs.getInt(3), //img_id
                        rs.getString(4), //description
                        rs.getDate(5), // generate_date
                        rs.getDate(6) //expired_date
                );
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return ads;
    }
    public void deleteAdvertise(int id) {
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "DELETE FROM advertise WHERE ads_id = "+id;
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void insertAdvertise(String path) {
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "INSERT INTO advertise (content,img_id,description,generate_date,expired_date) VALUES ('"
                    + content + "',"
                    + "(SELECT img_id FROM image WHERE path = '" + path.replace("\\", "\\\\") + "'),'"
                    + description + "',"
                    + "(now()),'"
                    + expired_date +"'"
                    + ")";
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void setImagePath(String path){
        Image image = new Image();
        image.updateImage(this.img_id, path);
    }
    
    public String getImagePath() {
        return new Image().getImageById(this.img_id).getPath();
    }

    @Override
    public List getAllAttribute() {
        List<Advertise> list = new ArrayList<Advertise>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM advertise");
            while (rs.next()) {
                Advertise ads = new Advertise(
                        rs.getInt(1), //Id
                        rs.getString(2), //content
                        rs.getInt(3), //img_id
                        rs.getString(4), //description
                        rs.getDate(5), // generate_date
                        rs.getDate(6) // expired date
                );
                list.add(ads);
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

    public int getImg_id() {
        return img_id;
    }

    public void setImg_id(int img_id) {
        this.img_id = img_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getGenerate_date() {
        return generate_date;
    }

    public void setGenerate_date(Date generate_date) {
        this.generate_date = generate_date;
    }

    public Date getExpired_date() {
        return expired_date;
    }

    public void setExpired_date(Date expired_date) {
        this.expired_date = expired_date;
    }

}

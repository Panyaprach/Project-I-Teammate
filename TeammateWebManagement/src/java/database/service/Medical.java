
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

public class Medical implements DataControl{
    private int id;
    private String content;
    private String description;
    private int image;   
    
    public Medical(){}
    public Medical(int id, String content, String description, int image) {
        this.id = id;
        this.content = content;
        this.description = description;
        this.image = image;
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

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }
    
}

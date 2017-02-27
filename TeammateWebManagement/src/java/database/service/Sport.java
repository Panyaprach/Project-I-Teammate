
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

public class Sport implements DataControl{
    private int id;
    private String name;

    public Sport() {
    }

    public Sport(int id, String name) {
        this.id = id;
        this.name = name;
    }
       
    @Override
    public List getAllAttribute() {
        List<Sport> list = new ArrayList<Sport>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM sport");
            while (rs.next()) {
                int id = rs.getInt(1);
                String name = rs.getString(2);
                Sport sport = new Sport(id, name);
                list.add(sport);
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}

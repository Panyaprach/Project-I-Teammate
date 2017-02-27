
package database.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Location implements DataControl{
    private int id;
    private String name;
    private String latitude;
    private String longitude;
    private boolean byAdmin;
    private int c_id;
    
    public Location(){}
    public Location(int id, String name,String latitude, String logitude) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = logitude;
        this.byAdmin = true;
    }

    public Location(int id, String name, String latitude, String longitude, boolean byAdmin, int c_id) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.byAdmin = byAdmin;
        this.c_id = c_id;
    }
    
    @Override
    public List getAllAttribute() {
        List<Location> list = new ArrayList<Location>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM location");
            while (rs.next()) {
                int id = rs.getInt(1);
                String name = rs.getString(2);
                String latitude = rs.getString(3);
                String longitude = rs.getString(4);
                boolean byAdmin = rs.getBoolean(5);
                int c_id = rs.getInt(6);
                Location location = new Location(id, name, latitude, longitude, byAdmin, c_id);
                list.add(location);
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
    
    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String logitude) {
        this.longitude = logitude;
    }

    public boolean isByAdmin() {
        return byAdmin;
    }

    public void setByAdmin(boolean byAdmin) {
        this.byAdmin = byAdmin;
    }

    public int getC_id() {
        return c_id;
    }

    public void setC_id(int c_id) {
        this.c_id = c_id;
    }
    
}

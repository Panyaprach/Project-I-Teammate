
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
    public Sport(String name){
        this.name = name;
    }
    public Sport(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
       public void updateSport(){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "Update sport SET name='"
                    + this.name + "' WHERE s_id = " + this.id;
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Sport selectMedicalById(int sid) {
        Sport sport = null;
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM sport WHERE s_id = " + sid);
            while (rs.next()) {
                int id = rs.getInt(1);
                String name = rs.getString(2);
                sport = new Sport(id, name);
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return sport;
    }
    public void deleteSport(int id){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "DELETE FROM sport WHERE s_id = " + id;
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void insertSport(){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql = "INSERT INTO sport (name) VALUES ('"+ this.name + "')";
            System.out.println(sql);
            stmt.executeUpdate(sql);
            stmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
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

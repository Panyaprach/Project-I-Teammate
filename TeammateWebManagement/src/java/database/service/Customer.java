package database.service;

import java.util.List;
import java.util.Date;
import java.sql.*;
import java.util.ArrayList;

public class Customer implements DataControl {

    private int c_id;
    private String username;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private char gender;
    private Date generate_date;
    private int img_id;
    private String status;

    public Customer() {
    }

    public Customer(int c_id, String username, String firstname, String lastname, Date birthdate, char gender, Date generate_date, int img_id, String status) {
        this.c_id = c_id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.gender = gender;
        this.generate_date = generate_date;
        this.img_id = img_id;
        this.status = status;
    }
    
    public List searchCustomer(String search){
        List<Customer> list = new ArrayList<Customer>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            String sql =  "SELECT * FROM customer WHERE c_id='%"+search+"%'"+
                    " OR username LIKE '%"+search+"%'"+
                    " OR firstname LIKE '%%"+search+"%'"+
                    " OR lastname LIKE '%"+search+"%'"+
                    " OR birthdate LIKE '%"+search+"%'"+
                    " OR gender LIKE '%"+search+"%'"+
                    " OR generate_date LIKE '%"+search+"%'"+
                    " OR status LIKE '%"+search+"%'";
            System.out.println(sql);
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int id = rs.getInt(1);
                String username = rs.getString(2);
                String firstname = rs.getString(3);
                String lastname = rs.getString(4);
                Date birthdate = rs.getDate(5);
                char gender = rs.getString(6).charAt(0);
                Date generate_date = rs.getTimestamp(7);
                int img = rs.getInt(8);
                String status = rs.getString(9);
                Customer customer = new Customer(
                        id,
                        username,
                        firstname,
                        lastname,
                        birthdate,
                        gender,
                        generate_date,
                        img,
                        status
                );
                list.add(customer);
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return list;
    }
    //set ban status
    public void banCustomer(int id){
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT status FROM customer WHERE c_id="+id);
            rs.next();
            String stat =  (rs.getString(1).equals("Banned")) ? "Normal" : "Banned";   
            stmt.executeUpdate("UPDATE customer SET status = '"+stat+"' WHERE c_id="+id);
            rs.close();
            stmt.close();
            con.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    // return image object
    public String getImagePath() {
        return new Image().getImageById(this.img_id).getPath();
    }

    @Override
    public List getAllAttribute() {
        List<Customer> list = new ArrayList<Customer>();
        Connection con = null;
        Statement stmt = null;
        try {
            Class.forName(JDBC_Driver);
            con = DriverManager.getConnection(DB_URL, user, pass);
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM customer");
            while (rs.next()) {
                int id = rs.getInt(1);
                String username = rs.getString(2);
                String firstname = rs.getString(3);
                String lastname = rs.getString(4);
                Date birthdate = rs.getDate(5);
                char gender = rs.getString(6).charAt(0);
                Date generate_date = rs.getTimestamp(7);
                int img = rs.getInt(8);
                String status = rs.getString(9);
                Customer customer = new Customer(
                        id,
                        username,
                        firstname,
                        lastname,
                        birthdate,
                        gender,
                        generate_date,
                        img,
                        status
                );
                list.add(customer);
            }
            rs.close();
            stmt.close();
            con.close();
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return list;
    }

    public int getC_id() {
        return c_id;
    }

    public void setC_id(int c_id) {
        this.c_id = c_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Date getGenerate_date() {
        return generate_date;
    }

    public void setGenerate_date(Date generate_date) {
        this.generate_date = generate_date;
    }

    public int getImg_id() {
        return img_id;
    }

    public void setImg_id(int img_id) {
        this.img_id = img_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}

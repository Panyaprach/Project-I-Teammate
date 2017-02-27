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
    
    public Customer(){}
    public Customer(int c_id, String username, String firstname, String lastname, Date birthdate, char gender, Date generate_date) {
        this.c_id = c_id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.gender = gender;
        this.generate_date = generate_date;
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
                Customer customer = new Customer(id,username,firstname,lastname,birthdate,gender,generate_date);
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
    
}

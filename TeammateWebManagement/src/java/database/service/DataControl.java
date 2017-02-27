package database.service;


import java.util.List;


public interface DataControl {
    String JDBC_Driver = "com.mysql.jdbc.Driver";
    String DB_URL = "jdbc:mysql://localhost:3306/teammate";
    String user = "root";
    String pass = "";
    List getAllAttribute();
}
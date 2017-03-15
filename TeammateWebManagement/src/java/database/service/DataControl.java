package database.service;


import java.util.List;


public interface DataControl {
    //Database Manage
    String JDBC_Driver = "com.mysql.jdbc.Driver";
    String DB_URL = "jdbc:mysql://localhost:3306/teammate?useUnicode=true&characterEncoding=UTF-8";
    String user = "root";
    String pass = "";
    //Declare method for query all data in the table
    List getAllAttribute();
}
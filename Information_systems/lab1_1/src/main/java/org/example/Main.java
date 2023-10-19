package org.example;

import java.sql.Connection;
import java.sql.DriverManager;

public class Main {
    public static void main(String[] args) {
       try
       {
           DatabaseHandler databaseHandler = new DatabaseHandler();
           Menu menu = new Menu(databaseHandler);
           menu.start();

       }
       catch(Exception ex)
       {
           System.out.println(ex.getMessage());
       }
    }
}
package org.example;

import java.sql.*;

public class DatabaseHandler {
    private Connection connection;

    public DatabaseHandler() throws SQLException
    {
        connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bankdb",
                "root", "1234");

        if (connection == null)
            throw new RuntimeException("Failed to create connection");
    }

    public ResultSet sqlQuery(String query) throws SQLException {
        Statement stmt = connection.createStatement(java.sql.ResultSet.TYPE_FORWARD_ONLY,
                java.sql.ResultSet.CONCUR_READ_ONLY);
        stmt.setFetchSize(Integer.MIN_VALUE);
        return stmt.executeQuery(query);
    }

    public void sqlUpdate(String query) throws SQLException {
        Statement stmt = connection.createStatement();
        stmt.executeUpdate(query);
    }
}

package org.example;

import java.io.IOException;
import java.sql.Connection;
import java.util.Scanner;

public class Menu implements MenuInterface
{
    public Menu(DatabaseHandler databaseHandler)
    {
        this.m_databaseHandler = databaseHandler;
        this.m_scanner = new Scanner(System.in);
        this.userMenu = new UserMenu(databaseHandler);
    }

    @Override
    public void start()
    {
        Character res = '0';

        while(res != '3')
        {
            System.out.println("Select your role:\n" +
                    "1. User\n" +
                    "2. Admin\n" +
                    "3. Exit");

            res = m_scanner.next().charAt(0);

            switch (res)
            {
                case '1' :
                    userMenu.start();
                    break;
                case '2' :
                    adminMenu.start();
                    break;
                default:
                    return;
            }
        }
    }

    @Override
    public void showError(String error){

    }

    private Scanner m_scanner;
    private DatabaseHandler m_databaseHandler;
    private AdminMenu adminMenu;
    private UserMenu userMenu;

}

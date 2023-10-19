package org.example;

import org.example.DatabaseClasses.Card;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

public class UserMenu implements MenuInterface
{
    private Scanner m_scanner;
    private DatabaseHandler m_databaseHandler;
    private String userId;

    public UserMenu(DatabaseHandler databaseHandler)
    {
        this.m_databaseHandler = databaseHandler;
        this.m_scanner = new Scanner(System.in);
    }

    @Override
    public void start()
    {
        try
        {
            login();

            Character res = '0';

            while(res != '6')
            {
                System.out.println("""
                    Select an option:
                    1. Finances
                    2. Cards
                    3. Contacts
                    4. Statistics
                    5. Personal Information
                    6. Exit \s""");

                res = m_scanner.next().charAt(0);

                switch (res)
                {
                    case '1' :
                        finances();
                        break;
                    case '2' :
                        cards();
                        break;
                    case '3' :
                        contacts();
                        break;
                    case '4' :
                        statistics();
                        break;
                    case '5' :
                        personalInformation();
                        break;
                    default:
                        return;
                }
            }
        }
        catch (Exception ex)
        {
            System.out.println("Error occurred");
            System.out.println(ex.getMessage());
        }
    }

    private void login() throws SQLException {
        System.out.println("Enter name");
        String name = m_scanner.nextLine();
        System.out.println("Enter surname");
        String surname = m_scanner.nextLine();

        String query = "SELECT * FROM users WHERE name = '" + name + "' AND surname = '" + surname + "'";

        ResultSet resultSet = m_databaseHandler.sqlQuery(query);

        if(resultSet.next())
            userId = resultSet.getString("id");
        else
        {
            showError("No such user");
            resultSet.close();
            throw new RuntimeException("No such user");
        }

        resultSet.close();
    }

    private void finances() throws SQLException, IOException {
        Character res = '0';

        while(res != '5')
        {
            System.out.println("""
                    Select an option:
                    1. Show balance
                    2. Deposit
                    3. Withdraw
                    4. Send
                    5. Back \s""");

            res = m_scanner.next().charAt(0);

            switch (res)
            {
                case '1' :
                    showBalance();
                    break;
                case '2' :
                   deposit();
                    break;
                case '3' :

                    break;
                case '4' :

                    break;
                default:
                    return;
            }
        }
    }
    @Override
    public void showError(String error)
    {
        try
        {
            System.out.println("Error occurred: " + error + "\n" +
                    "Press Enter to continue.");

            System.in.read();
            m_scanner.nextLine();
        } catch (IOException e)
        {
            System.out.println(e.getMessage());
        }
    }
    private void showBalance() throws SQLException, IOException {

        Card card = selectCard();
        System.out.println("Card number: " + card.number);
        System.out.println("Balance: " + card.balance);

        pressEnterToContinue(m_scanner);
    }

    private void deposit() throws SQLException {
        Card card = selectCard();

        System.out.println("Enter amount: ");
        int amount = m_scanner.nextInt() + card.balance;

        if(amount < 0)
            throw new RuntimeException("Wrong input");

        String query = "UPDATE cards SET balance = '" + amount + "' WHERE number = '" + card.number + "'";
        m_databaseHandler.sqlUpdate(query);
    }

    private void withdraw()
    {

    }

    private void send()
    {

    }

    private void cards()
    {
        Character res = '0';

        while(res != '4')
        {
            System.out.println("""
                    S1elect an option:
                    1. Show cards
                    2. Add card
                    3. Delete card
                    4. Back
                    . \s""");

            //res = m_scanner_.next().charAt(0);

            switch (res)
            {
                case '1' :

                    break;
                case '2' :

                    break;
                case '3' :

                    break;
                default:
                    return;
            }
        }
    }

    private ArrayList<Card> getCards() throws SQLException {
        ArrayList<Card> res = new ArrayList<>();
        String query = "SELECT * FROM cards WHERE owners_id = '" + userId + "'";
        ResultSet resultSet = m_databaseHandler.sqlQuery(query);

        while(resultSet.next())
        {
            Card card = new Card(
                    resultSet.getInt("id"),
                    resultSet.getString("number"),
                    resultSet.getInt("owners_id"),
                    resultSet.getInt("balance"));

            res.add(card);
        }
        resultSet.close();
        return res;
    }

    private Card selectCard() throws SQLException {
        ArrayList<Card> cards = getCards();

        if(cards.isEmpty())
        {
            showError("User has no cards.");
            throw new RuntimeException("User has no cards.");
        }

        System.out.println("Select card: ");

        for(int i = 0; i < cards.size(); i++)
        {
            System.out.println(i + ". " + cards.get(i).number);
        }

        Integer index = m_scanner.nextInt();

        if(index >= cards.size())
            throw new RuntimeException("Out of limits.");

        return cards.get(index);
    }
    private void contacts()
    {
        Character res = '0';

        while(res != '3')
        {
            System.out.println("""
                    Select an option:
                    1. Save new contact
                    2. Delete contact
                    3. Back
                    . \s""");

    //        res = m_scanner_.next().charAt(0);

            switch (res)
            {
                case '1' :

                    break;
                case '2' :

                    break;
                default:
                    return;
            }
        }
    }

    private void statistics()
    {
        Character res = '0';

        while(res != '3')
        {
            System.out.println("""
                    Select an option:
                    1. Show expenses
                    2. Show income
                    3. Show total earnings
                    4. Back
                    . \s""");

          //  res = m_scanner_.next().charAt(0);

            switch (res)
            {
                case '1' :

                    break;
                case '2' :

                    break;
                default:
                    return;
            }
        }
    }

    private void personalInformation()
    {
        Character res = '0';

        while(res != '3')
        {
            System.out.println("""
                        Select an option:
                        1. Show expenses
                        2. Show income
                        3. Show total earnings
                        4. Back
                        . \s""");

         //   res = m_scanner_.next().charAt(0);

            switch (res)
            {
                case '1' :

                    break;
                case '2' :

                    break;
                default:
                    return;
            }
        }
    }
}

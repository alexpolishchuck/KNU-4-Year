package org.example.DatabaseClasses;

public class Card
{
    public Integer id;
    public String number;
    public Integer ownersId;
    public Integer balance;

    public Card(Integer id, String number, Integer ownersId, Integer balance)
    {
        this.id = id;
        this.number = number;
        this.ownersId = ownersId;
        this.balance = balance;
    }
}

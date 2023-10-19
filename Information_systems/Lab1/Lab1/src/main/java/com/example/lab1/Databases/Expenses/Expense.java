package com.example.lab1.Databases.Expenses;

import com.example.lab1.Databases.Cards.Card;
import javax.persistence.*;
import lombok.*;

import javax.persistence.Entity;
import java.sql.Time;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Expense")
@Table(name = "expenses")
public class Expense
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private int amount;

    @Column(name = "type_of_transaction")
    private String type_of_transaction;

    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private Time time;

    @ManyToOne(targetEntity = Card.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "senders_card_number", referencedColumnName = "number")
    private Card senders_card;

    @ManyToOne(targetEntity = Card.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "receivers_card_number", referencedColumnName = "number")
    private Card receivers_card;
}

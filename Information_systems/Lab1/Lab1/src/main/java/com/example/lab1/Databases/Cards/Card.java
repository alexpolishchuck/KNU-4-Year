package com.example.lab1.Databases.Cards;

import com.example.lab1.Databases.Expenses.Expense;
import com.example.lab1.Databases.Users.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Card")
@Table(name = "cards")
public class Card
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "number")
    private String number;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "owners_id", referencedColumnName = "id")
    private User user;

    @OneToMany(targetEntity = Expense.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "senders_card_number", referencedColumnName = "number")
    private List<Expense> expenses;

    @OneToMany(targetEntity = Expense.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "receivers_card_number", referencedColumnName = "number")
    private List<Expense> income;
}

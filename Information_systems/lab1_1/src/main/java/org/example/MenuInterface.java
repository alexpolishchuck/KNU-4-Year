package org.example;

import java.io.IOException;
import java.util.Scanner;

public interface MenuInterface {
    void start();
    void showError(String error);

    default void pressEnterToContinue(Scanner scanner) throws IOException {
        System.out.println("Press Enter to continue");
        System.in.read();
        scanner.nextLine();
    }
}

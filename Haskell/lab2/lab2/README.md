# LAB 2. Варіант 3.	Вирішити систему лінійних рівнянь паралельним варіантом методу Гаусса
## Опис:

Програма складається з кількох етапів: 

1) Створюємо випадкової матриці розміроності N (метод - **generateRandomMatrix**)

2) Передаємо матрицю до методу перетворення Гауса - **gaussianElimination** (який передає матрицю у рекурсивний метод upperTriangularize)
   
3) **gaussianElimination** передає матрицю у рекурсивний метод **upperTriangularize**. 
  `resultVar` - змінна, завдяки якої ми отримуватимемо отримані обчислення від потоків.

  Метод **upperTriangularize** запускає кожен потік (їх кількість - визначена змінною `splitByNumber`) для обчислення різниці між поточним рядком та всіма, що йдуть після нього (згідно алгоритму):

  `forM_ [0..size - 1] $ \i ->
    forkIO (substractRowsMultithreaded resultVar newRow pos (splittedArray !! i))`
    
Нові обчислені рядки об'єднуємо у нову матрицю:
    `results <- replicateM size $ takeMVar resultVar`
Продовжуємо, доки не отримаємо верхньотрикутну матрицю. 

Аналогічно з нижньотрикутною у методі `backSubstitute`

## Гіф - демонстрація

![](https://github.com/alexpolishchuck/KNU-4-Year/blob/main/Haskell/Lab2/lab2/Lab2.gif)

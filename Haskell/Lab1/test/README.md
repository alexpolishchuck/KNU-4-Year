# LAB 1. Варіант - Система Факультативи
## Опис:
Лабораторна робота виконана за допомогою бібліотеки postgre-sql simple. 

## Таблиці: 
У цій лабораторній роботі використано 6 таблиць: 
**- previews**: ця таблиця містить короткий опис наукової роботи.
(відповідна структура даних у Haskell - PreviewData)
Стовпчики:
  - id
  - resource_id - айді наукової роботи
  - preview_text - короткий опис наукової роботи

**- resource**: ця таблиця містить наукові роботи.
(відповідна структура даних у Haskell - ResourceData)
Стовпчики:
  - id
  - name - назва
  - author - автор
  - date - дата створення

**- reviews**: ця таблиця містить огляди на наукові роботи.
(відповідна структура даних у Haskell - ReviewData)
Стовпчики:
  - resource_id - айді ресурсу, на який написано огляд
  - score - оцінка ресурсу 
  - user_name - логін користувача, який залишив відгук

**- statistics**: ця таблиця містить статистику переглядів наукових робіт.
(відповідна структура даних у Haskell - StatisticsData)
Стовпчики:
  - name_of_resource - назва наукової роботи
  - views - кількість переглядів
  - name_of_author - автор

**- subscriptions**: ця таблиця містить дані про підписи користувачів, які бажають спостерігати за змінами у ресурсі.
(відповідна структура даних у Haskell - SubscriptionData)
Стовпчики:
  - name_of_resource - назва наукової роботи
  - date_of_subscription - дата підписання 
  - name_of_subscriber - логін користувача

**- users**: таблиця користувачів.
(відповідна структура даних у Haskell - UserData)
Стовпчики:
  - name - ім'я користувача
  - email - логін/поштова скринька
  - role - роль (користувач/викладач тощо)

## Хід роботи програми: 
**1) Запуск головного меню, яке складається з наступних пунктів:**
Select option:
1) Resources
2) Reviews
3) Statistics
4) Subscriptions
5) Users
6) Previews
7) Exit

**2) Обрання одного з підпунктів меню (в нашому випадку - номер 5 - Users):**
Select option:
1) Show users
2) Add user
3) Edit user
4) Delete user
5) Exit

**3) Обираємо будь-який з пунктів, наприклад, номер 2 - Add user, вводимо дані нового користувача:**
2
Name: 
TEST   
Email: 
TESTTEST
Role: 
TESTROLE

## Гіф - демонстрація

![](https://github.com/alexpolishchuck/KNU-4-Year/blob/main/Haskell/Lab1/test/Lab1.gif)

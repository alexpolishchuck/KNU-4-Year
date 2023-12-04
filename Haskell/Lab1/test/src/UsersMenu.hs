{-# LANGUAGE OverloadedStrings #-}
module UsersMenu where
import Models.UsersModel
import Database.PostgreSQL.Simple
import Data.Text(Text)
import Database.PostgreSQL.Simple.Types (Query(Query))
import Data.String (IsString)
import qualified Data.String

showUsers :: Connection -> IO()
showUsers conn = do
    res <- query_ conn "select * from users" :: IO [UserData]
    print res

addUser :: Connection -> IO()
addUser conn = do
    putStrLn("Name: ")
    name_ <- getLine

    putStrLn("Email: ")
    email_ <- getLine

    putStrLn("Role: ")
    role_ <- getLine

    _ <-
        execute
            conn 
            "insert into users (name, email, role) values (?, ?, ?)" 
            (name_, email_, role_)

    putStrLn("")


editUser :: Connection -> IO()
editUser conn = do
    putStrLn("Enter email:")

    email_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) name")
    putStrLn("2) email")
    putStrLn("3) role")

    resp <- getChar
    _ <- getLine

    let choise = case resp of
            '1' -> "name" :: String
            '2' -> "email" :: String
            '3' -> "role" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine
    
    let querString = ("update users set " ++ choise ++ "= ? where email = ?") :: String

    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, email_)

    putStrLn("")

deleteUser :: Connection -> IO()
deleteUser conn = do
    putStrLn("Enter email:")

    email_ <- getLine

    _ <-
        execute
            conn 
            "delete from users where email = ?" 
            (Only email_)

    putStrLn("")
{-# LANGUAGE OverloadedStrings #-}
module ResourcesMenu where

import Database.PostgreSQL.Simple
import Data.Text(Text)
import Models.SubscriptionModel
import Database.PostgreSQL.Simple.Time
import qualified Data.String
import Models.ReviewModel
import Models.ResourceModel

showRes :: Connection -> IO()
showRes conn = do
    res <- query_ conn "select * from resource" :: IO [ResourceData]
    print res

addRes :: Connection -> IO()
addRes conn = do
    putStrLn("name: ")
    name <- getLine

    putStrLn("author: ")
    author <- getLine

    putStrLn("date: ")
    date <- getLine

    _ <-
        execute
            conn 
            "insert into resource (name, author, date) values (?, ?, ?)" 
            (name, author, date)

    putStrLn("")


editRes :: Connection -> IO()
editRes conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) name")
    putStrLn("2) author")
    putStrLn("3) date")

    resp <- getChar
    _ <- getLine

    let choice = case resp of
            '1' -> "name" :: String
            '2' -> "author" :: String
            '3' -> "date" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine

    let querString = ("update resource set " ++ choice ++ "= ? where id = ?") :: String
    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, id_)

    putStrLn("")

deleteRes :: Connection -> IO()
deleteRes conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    _ <-
        execute
            conn 
            "delete from resource where id = ?" 
            (Only id_)

    putStrLn("")
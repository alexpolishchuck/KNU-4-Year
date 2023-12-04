{-# LANGUAGE OverloadedStrings #-}
module SubscriptionsMenu where

import Database.PostgreSQL.Simple
import Data.Text(Text)
import Models.SubscriptionModel
import Database.PostgreSQL.Simple.Time
import qualified Data.String

showSubscr :: Connection -> IO()
showSubscr conn = do
    res <- query_ conn "select * from subscriptions" :: IO [SubscriptionData]
    print res

addSubscr :: Connection -> IO()
addSubscr conn = do
    putStrLn("Name of resource: ")
    name_of_res <- getLine

    putStrLn("Date: ")
    date_ <- getLine

    putStrLn("Name of subscriber: ")
    name_ <- getLine

    _ <-
        execute
            conn 
            "insert into subscriptions (name_of_resource, date_of_subscription, name_of_subscriber) values (?, ?, ?)" 
            (name_of_res, date_, name_)

    putStrLn("")


editSubscr :: Connection -> IO()
editSubscr conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) name_of_resource")
    putStrLn("2) date")
    putStrLn("3) name_of_subscriber")

    resp <- getChar
    _ <- getLine

    let choice = case resp of
            '1' -> "name_of_resource" :: String
            '2' -> "date_of_subscription" :: String
            '3' -> "name_of_subscriber" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine

    let querString = ("update subscriptions set " ++ choice ++ "= ? where id = ?") :: String
    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, id_)

    putStrLn("")

deleteSubscr :: Connection -> IO()
deleteSubscr conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    _ <-
        execute
            conn 
            "delete from subscriptions where id = ?" 
            (Only id_)

    putStrLn("")
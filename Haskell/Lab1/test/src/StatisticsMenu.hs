{-# LANGUAGE OverloadedStrings #-}
module StatisticsMenu where

import Database.PostgreSQL.Simple
import Data.Text(Text)
import Models.SubscriptionModel
import Database.PostgreSQL.Simple.Time
import qualified Data.String
import Models.StatisticsModel

showStats :: Connection -> IO()
showStats conn = do
    res <- query_ conn "select * from statistics" :: IO [StatisticsData]
    print res

addStat :: Connection -> IO()
addStat conn = do
    putStrLn("Name of resource: ")
    name_of_res <- getLine

    putStrLn("name of author: ")
    name_of_author <- getLine

    putStrLn("Views: ")
    views <- getLine

    _ <-
        execute
            conn 
            "insert into statistics (name_of_resource, name_of_author, views) values (?, ?, ?)" 
            (name_of_res, name_of_author, views)

    putStrLn("")


editStat :: Connection -> IO()
editStat conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) name_of_resource")
    putStrLn("2) name_of_author")
    putStrLn("3) views")

    resp <- getChar
    _ <- getLine

    let choice = case resp of
            '1' -> "name_of_resource" :: String
            '2' -> "date_of_subscription" :: String
            '3' -> "name_of_subscriber" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine

    let querString = ("update statistics set " ++ choice ++ "= ? where id = ?") :: String
    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, id_)

    putStrLn("")

deleteStat :: Connection -> IO()
deleteStat conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    _ <-
        execute
            conn 
            "delete from statistics where id = ?" 
            (Only id_)

    putStrLn("")
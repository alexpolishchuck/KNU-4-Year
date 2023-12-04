{-# LANGUAGE OverloadedStrings #-}
module ReviewsMenu where

import Database.PostgreSQL.Simple
import Data.Text(Text)
import Models.SubscriptionModel
import Database.PostgreSQL.Simple.Time
import qualified Data.String
import Models.ReviewModel

showRev :: Connection -> IO()
showRev conn = do
    res <- query_ conn "select * from reviews" :: IO [ReviewData]
    print res

addRev :: Connection -> IO()
addRev conn = do
    putStrLn("resource_id: ")
    resource_id <- getLine

    putStrLn("score: ")
    score <- getLine

    putStrLn("user_name: ")
    user_name <- getLine

    _ <-
        execute
            conn 
            "insert into reviews (resource_id, score, user_name) values (?, ?, ?)" 
            (resource_id, score, user_name)

    putStrLn("")


editRev :: Connection -> IO()
editRev conn = do
    putStrLn("Enter resource_id:")

    id_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) resource_id")
    putStrLn("2) score")
    putStrLn("3) user_name")

    resp <- getChar
    _ <- getLine

    let choice = case resp of
            '1' -> "name_of_resource" :: String
            '2' -> "date_of_subscription" :: String
            '3' -> "name_of_subscriber" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine

    let querString = ("update reviews set " ++ choice ++ "= ? where resource_id = ?") :: String
    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, id_)

    putStrLn("")

deleteRev :: Connection -> IO()
deleteRev conn = do
    putStrLn("Enter resource_id:")

    id_ <- getLine

    _ <-
        execute
            conn 
            "delete from reviews where resource_id = ?" 
            (Only id_)

    putStrLn("")
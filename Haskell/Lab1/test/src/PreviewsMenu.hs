{-# LANGUAGE OverloadedStrings #-}
module PreviewsMenu where

import Database.PostgreSQL.Simple
import Data.Text(Text)
import Models.SubscriptionModel
import Database.PostgreSQL.Simple.Time
import qualified Data.String
import Models.ReviewModel
import Models.ResourceModel
import Models.PreviewsModel

showPrev :: Connection -> IO()
showPrev conn = do
    res <- query_ conn "select * from previews" :: IO [PreviewData]
    print res

addPrev :: Connection -> IO()
addPrev conn = do
    putStrLn("resource_id: ")
    name <- getLine

    putStrLn("preview_text: ")
    author <- getLine

    _ <-
        execute
            conn 
            "insert into previews (resource_id, preview_text) values (?, ?)" 
            (name, author)

    putStrLn("")


editPrev :: Connection -> IO()
editPrev conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    putStrLn("Select what you want to change:")
    putStrLn("1) resource_id")
    putStrLn("2) preview_text")

    resp <- getChar
    _ <- getLine

    let choice = case resp of
            '1' -> "resource_id" :: String
            '2' -> "preview_text" :: String
            _ -> ""

    putStrLn("Enter new value: ")
    val <- getLine

    let querString = ("update previews set " ++ choice ++ "= ? where id = ?") :: String
    let query_ = Data.String.fromString querString

    _ <-
        execute
            conn 
            query_
            (val, id_)

    putStrLn("")

deletePrev :: Connection -> IO()
deletePrev conn = do
    putStrLn("Enter id:")

    id_ <- getLine

    _ <-
        execute
            conn 
            "delete from previews where id = ?" 
            (Only id_)

    putStrLn("")
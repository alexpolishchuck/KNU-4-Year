{-# LANGUAGE OverloadedStrings #-}
module Main (main) where
import Database.PostgreSQL.Simple(query_, execute_, Only (Only), connectPostgreSQL, execute, query, FromRow, Query)
import MenuModule 
import DatabaseConnection
import DatabaseConnection (DatabaseConnectionInfoClass(get_connection))
import Data.Text(Text)
import Models.UsersModel(UserData (UserData))
import Data.Int(Int64)
import System.IO

q :: Query
q = "select * from users"

main :: IO ()
main = do    
  let db = DatabaseConnectionInfo {host = "localhost", port = 5432, database = "faculty_db", user = "postgres", password = "1234"}
  conn <- get_connection db

  showMainMenu conn

  putStrLn "End."


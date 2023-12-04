{-# LANGUAGE InstanceSigs #-}
module DatabaseConnection where

import Database.PostgreSQL.Simple
import GHC.Word

data DatabaseConnectionInfo = DatabaseConnectionInfo{
    host :: String
    , port :: GHC.Word.Word16
    , database :: String
    , user :: String
    , password :: String
}

class DatabaseConnectionInfoClass dbInfo where
    get_host :: dbInfo -> String
    get_port :: dbInfo -> GHC.Word.Word16
    get_database :: dbInfo -> String
    get_user :: dbInfo -> String
    get_password :: dbInfo -> String
    get_connection :: dbInfo -> IO Connection

instance DatabaseConnectionInfoClass DatabaseConnectionInfo where
    get_host = host
    get_port = port
    get_database = database
    get_user = user
    get_password = password
    get_connection (DatabaseConnectionInfo host_ port_ database_ user_ password_) = connect $
        defaultConnectInfo
            {
                connectHost = host_
                , connectPort = port_
                , connectDatabase = database_
                , connectUser = user_
                , connectPassword = password_
            }
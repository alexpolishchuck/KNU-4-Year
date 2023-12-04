{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.UsersModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)

data UserData = UserData {
    id :: Int64
    , name :: Text
    , email :: Text
    , role :: Text
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)

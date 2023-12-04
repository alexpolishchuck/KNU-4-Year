{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.ResourceModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)
import Database.PostgreSQL.Simple.Time (Date)

data ResourceData = ResourceData {
    id :: Int64
    , name :: Text
    , author :: Text
    , date :: Date
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)
    



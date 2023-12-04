{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.StatisticsModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)

data StatisticsData = StatisticsData {
    id :: Int64
    , name_of_resource :: Text
    , name_of_author :: Text
    , views :: Int64
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)
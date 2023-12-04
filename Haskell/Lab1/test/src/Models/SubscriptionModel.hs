{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.SubscriptionModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)
import Database.PostgreSQL.Simple.Time (Date)

data SubscriptionData = SubscriptionData {
    id :: Int64
    , name_of_resource :: Text
    , date_of_subscription :: Date
    , name_of_subscriber :: Text
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)

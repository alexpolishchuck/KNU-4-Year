{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.ReviewModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)

data ReviewData = ReviewData {
    resource_id :: Int64
    , score :: Int64
    , username :: Text
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)
    



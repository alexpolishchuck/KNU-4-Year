{-# LANGUAGE DerivingStrategies, DeriveAnyClass, GeneralizedNewtypeDeriving, DeriveGeneric #-}
module Models.PreviewsModel where
import Database.PostgreSQL.Simple(ToRow, FromRow)
import Data.Text(Text)
import Data.Int(Int64)
import GHC.Generics(Generic)

data PreviewData = PreviewData {
    id :: Int64
    , resource_id :: Int64
    , preview_text :: Text
}   deriving (Show, Generic)
    deriving anyclass (ToRow, FromRow)
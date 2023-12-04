module Main (main) where
import System.Random
import Control.Monad(replicateM)
import Control.Concurrent.Async
import Control.Concurrent
import Control.Parallel.Strategies
import Control.Parallel
import Control.Monad
import Data.List
import Data.List (sortBy)
import Data.Ord (comparing)
import Data.List.Split(chunksOf)

type Matrix = [[Double]]

gaussianElimination :: Matrix -> IO Matrix
gaussianElimination matrix = upperTriangularize (sortByNthElement 0 matrix) 0

upperTriangularize :: Matrix -> Int -> IO Matrix
upperTriangularize [] _ = return ([])
upperTriangularize (row:rest) pos = do

  let splitByNumber = 3
  let newRow = map (/ (row !! pos)) row

  let splittedArray = splitMatrix splitByNumber rest
  let size = length splittedArray

  resultVar <- newEmptyMVar

  forM_ [0..size - 1] $ \i ->
    forkIO (substractRowsMultithreaded resultVar newRow pos (splittedArray !! i))

  results <- replicateM size $ takeMVar resultVar

  let newMatrix = concat results
  let newPos = pos + 1

  res <- upperTriangularize (sortByNthElement newPos newMatrix) newPos
  return (newRow : res)


multiplyArrayByValue :: Double -> [Double] -> [Double]
multiplyArrayByValue multiplier array = map (* multiplier) array

sortByNthElement :: Int -> Matrix -> Matrix
sortByNthElement n = sortBy (flip $ comparing (!! (n)))

substractRowsMultithreaded :: MVar Matrix -> [Double] -> Int ->  Matrix -> IO()
substractRowsMultithreaded resultVar xs pos matrix = do
  let res = map (subtractRows xs pos) matrix
  putMVar resultVar res

subtractRows :: [Double] -> Int ->  [Double] -> [Double]
subtractRows _ pos [] = []
subtractRows [] pos _ = []
subtractRows xs pos ys = do
  let multipliedArray = multiplyArrayByValue (ys !! pos) xs
  subtractRows' multipliedArray ys

-- Function to subtract one row scaled by a factor from another row
subtractRows' :: [Double] -> [Double] -> [Double]
subtractRows' [] [] = []
subtractRows' (x:xs) (y:ys) = (y - x) : subtractRows' xs ys

-- Function to sort rows based on the leading coefficient
sortRows :: Matrix -> Matrix
sortRows matrix = sortBy (\row1 row2 -> compare (head row1) (head row2)) matrix

backSubstitute :: Matrix -> Int -> Matrix
backSubstitute [] _ = []
backSubstitute matrix pos = do
  let reverseMatrix = reverse matrix
  backSubstitute' reverseMatrix pos

-- Function to back-substitute and solve for variables
backSubstitute' :: Matrix -> Int -> Matrix
backSubstitute' [] _ = []
backSubstitute' (row:rest) pos = do

  let newPos = pos - 1
  row : backSubstitute' (map (subtractRows row pos) rest) newPos

generateRandomMatrix :: Int -> Int -> IO [[Double]]
generateRandomMatrix n m = Control.Monad.replicateM n (Control.Monad.replicateM m (randomRIO (1, 100) :: IO Double))

printMatrix :: [[Double]] -> IO ()
printMatrix = mapM_ printRow
  where
    printRow row = do
      mapM_ (putStr . (\x -> show x ++ " ")) row
      putStrLn ""


splitMatrix :: Int -> Matrix -> [Matrix]
splitMatrix n = do 
  chunksOf n

main :: IO ()
main = do
    randomMatrix <- generateRandomMatrix 4 5

    putStrLn "Random Matrix:"
    printMatrix randomMatrix
    
    let a = [[1.0,2.0,3.0, 1.0],[1.0,2.0,4.0, 2.0],[2.0,5.0,5.0, 3.0]]
    
    b <- gaussianElimination randomMatrix
    putStrLn "upperTriangularize Matrix:"
    printMatrix b

    let c = backSubstitute b 2
    putStrLn "Final Matrix:"
    printMatrix c


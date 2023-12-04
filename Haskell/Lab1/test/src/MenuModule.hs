module MenuModule(showMainMenu) where
import UsersMenu
import Database.PostgreSQL.Simple
import SubscriptionsMenu
import StatisticsMenu (showStats, addStat, editStat, deleteStat)
import ReviewsMenu (showRev, addRev, editRev, deleteRev)
import ResourcesMenu (showRes, addRes, editRes, deleteRes)
import PreviewsMenu (showPrev, addPrev, editPrev, deletePrev)

resourcesMenu :: Connection -> IO()
resourcesMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show resources")
    putStrLn("2) Add resource")
    putStrLn("3) Edit resource")
    putStrLn("4) Delete resource")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showRes conn
        '2' -> addRes conn
        '3' -> editRes conn
        '4' -> deleteRes conn
        _ -> putStrLn("")

reviewsMenu :: Connection -> IO()
reviewsMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show reviews")
    putStrLn("2) Add review")
    putStrLn("3) Edit review")
    putStrLn("4) Delete review")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showRev conn
        '2' -> addRev conn
        '3' -> editRev conn
        '4' -> deleteRev conn
        _ -> putStrLn("")

statisticsMenu :: Connection -> IO()
statisticsMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show statistics")
    putStrLn("2) Add statistics")
    putStrLn("3) Edit statistics")
    putStrLn("4) Delete statistics")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showStats conn
        '2' -> addStat conn
        '3' -> editStat conn
        '4' -> deleteStat conn
        _ -> putStrLn("")

subscriptionsMenu :: Connection -> IO()
subscriptionsMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show subscriptions")
    putStrLn("2) Add subscriptions")
    putStrLn("3) Edit subscriptions")
    putStrLn("4) Delete subscriptions")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showSubscr conn
        '2' -> addSubscr conn
        '3' -> editSubscr conn
        '4' -> deleteSubscr conn
        _ -> putStrLn("")

usersMenu :: Connection -> IO()
usersMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show users")
    putStrLn("2) Add user")
    putStrLn("3) Edit user")
    putStrLn("4) Delete user")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showUsers conn
        '2' -> addUser conn
        '3' -> editUser conn
        '4' -> deleteUser conn
        _ -> putStrLn("")

previewsMenu :: Connection -> IO()
previewsMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Show previews")
    putStrLn("2) Add previews")
    putStrLn("3) Edit previews")
    putStrLn("4) Delete previews")
    putStrLn("5) Exit")

    resp <- getChar
    _ <- getLine
    
    case resp of
        '1' -> showPrev conn
        '2' -> addPrev conn
        '3' -> editPrev conn
        '4' -> deletePrev conn
        _ -> putStrLn("")

showMainMenu :: Connection -> IO()
showMainMenu conn = do
    putStrLn("Select option:")
    putStrLn("1) Resources")
    putStrLn("2) Reviews")
    putStrLn("3) Statistics")
    putStrLn("4) Subscriptions")
    putStrLn("5) Users")
    putStrLn("6) Previews")
    putStrLn("7) Exit")

    resp <- getChar
    _ <- getLine

    case resp of
        '1' -> resourcesMenu conn
        '2' -> reviewsMenu conn
        '3' -> statisticsMenu conn
        '4' -> subscriptionsMenu conn
        '5' -> usersMenu conn
        '6' -> previewsMenu conn
        _ -> putStrLn("")

    if resp /= '7'
        then showMainMenu conn
    else putStrLn("")
const Pool = require('pg').Pool
require('dotenv').config()

const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const dbPool = new Pool(
  {
    user: dbUsername,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: dbName,
    ssl: true
  })

module.exports = {
    getUserByEmail: function (request, response) {
        let email = request.query.email

        dbPool.query('SELECT * FROM users WHERE email = $1', [email], (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("getUserByEmail. Database request failed")
                }
            else 
                {
                    response.status(200).json(res.rows)
                }
        })
    },
    getUserById: function (request, response) {
        let id = request.query.id

        dbPool.query('SELECT * FROM users WHERE id = $1', [id], (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("getUserById. Database request failed")
                }
            else 
                response.status(200).json(res.rows)
        })
    },

    addUser: function (request, response) {
        let email = request.body.email
        let name = request.body.name
        let surname = request.body.surname
        let isVarified = false

        dbPool.query('INSERT INTO users(email, name, surname, is_verified)\
         VALUES($1, $2, $3, $4)', 
         [email, name, surname, isVarified], 
         (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("addUser. Database request failed")
                }
            else 
                response.status(200)
        })
    },

    updateUser: function (request, response) {
        let email = request.body.email
        let name = request.body.name
        let surname = request.body.surname
        let isVarified = request.body.isVarified

        dbPool.query('UPDATE users SET name=$1, surname=$2, is_verified=$3, WHERE email=$4', 
         [name, surname, isVarified, email], 
         (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("addUser. Database request failed")
                }
            else 
                response.status(200)
        })
    },

    getUserWallets: function (request, response) {
        let id = request.query.id
        
        dbPool.query('SELECT * FROM wallets WHERE user_id = $1', [id], (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("getUserWallets. Database request failed")
                }
            else 
                response.status(200).json(res.rows)
        })
    },
    addWallet: function (request, response) {
        let user_id = request.body.user_id
        let wallet = request.body.wallet

        dbPool.query('INSERT INTO wallets(user_id, wallet)\
         VALUES($1, $2)', 
         [user_id, wallet], 
         (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("addWallet. Database request failed")
                }
            else 
                response.status(200)
        })
    },
    userWalletExists: function (request, response) {
        let wallet = request.query.wallet

        dbPool.query('SELECT * FROM wallets WHERE wallet = $1', [wallet], (error, res) => {
            if(error)
                {
                    console.log('[BACK][DEBUG]' + error.name);
                    console.log('[BACK][DEBUG]' + error.message);
                    response.status(500).send("getUserWallets. Database request failed")
                }
            else 
                {
                    if(res.rows.length != 0)
                        response.status(200).json({exists: true})
                }
        })
    }
  };
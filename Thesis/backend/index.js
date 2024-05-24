const express=require('express');
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')
const bodyParser = require('body-parser')

const db = require('./database');
require('dotenv').config() // Must be the last one

const bakcendApiId = process.env.BACKEND_API_IDENTIFIER
const backendAlgo = process.env.BACKEND_TOKEN_ALGO
const backendAuthority = process.env.BACKEND_AUTHORITY
const userRolesClaim = process.env.ROLES_USER_TOKEN_CLAIM

const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const jwtCheck = auth({
  audience: bakcendApiId,
  issuerBaseURL: backendAuthority,
  tokenSigningAlg: backendAlgo
});
//app.use(jwtCheck);

// Database requests
app.get("/user", db.getUserByEmail)
app.get("/user/byId", db.getUserById)
app.post("/user", jwtCheck, db.addUser)
app.post("/user/update", jwtCheck, db.updateUser)

app.get("/wallets", db.getUserWallets)
app.get("/wallets/exists", db.userWalletExists)
app.post("/wallets", jwtCheck, db.addWallet)


const port=5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
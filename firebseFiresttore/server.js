
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


// const admin = require("firebase-admin");
// const credentials = require("./sericeAccounKey.json");
// const { async } = require('@firebase/util');


// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// });


// const db = admin.firestore();

const cRoute = require("./route/crudRoute");
app.use('/', cRoute);



app.listen(9000, ()=>{
    console.log(`Server is started.... :)`)
})
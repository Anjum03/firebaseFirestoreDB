const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const credentials = require("../sericeAccounKey.json");
const { async } = require('@firebase/util');


admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const db = admin.firestore();

router.post('/create', async(req,res)=>{
    try {
        console.log(req.body);
        const id = req.body.email;
        const userJson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            PhoneNo: req.body.PhoneNo,
            Message: req.body.Message,
        };
        const dataResponse = await db.collection("users").doc(id).set(userJson);
        res.send(dataResponse);
    } catch (error) {
        res.send(error);
    }
})


// all informaion  from db(user collection)

router.get('/read/all', async(req,res)=>{
    try{
        const usersRef = db.collection("users");
        const response  = await usersRef.get();
        let responseArr = [];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        })
        res.send(responseArr)
    }catch(error){
        res.send(error);
    }

})

//one item we need or one typeof information we want then hit with the id 
router.get('/read/:id', async(req,res)=>{
    try{
        const userRef = db.collection("users").doc(req.params.id);
        const response  = await userRef.get();
        res.send(response.data())
    }catch(error){
        res.send(error);
    }

})
//to update something
router.post('/update', async(req,res)=>{
    try{
        const id = req.body.id;

        const data = {firstName, lastName, email, PhoneNo, Message} = req.body

        // const newFirstName = "Hello World";
        const userRef = await   db.collection("users").doc(id)
        .update({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            PhoneNo: data.PhoneNo,
            Message: data.Message
        })
        res.send(response);
    }catch(error){
        res.send(error);
    }

})

//to delete id
router.delete('/delete/:id', async (req,res)=>{
    try{
        const response = await db.collection("users").doc(req.params.id).delete();
        res.send(response);
    }catch(error){
        res.send(error);
    }

})











module.exports = router
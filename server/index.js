const express = require('express');
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://kwengwoo:4325118@firstnode.eq5cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>console.log("Mongoose Connected...")).catch(err=>console.log(err));

app.get('/',(req,res)=>{
 res.send("node welcome!")
});

app.listen(port,()=>console.log(`express listening on port ${port}! `))
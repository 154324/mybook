const express = require('express');
const app = express()
const port = 5000

app.get('/',(req,res)=>{
 res.send("node welcome!")
});

app.listen(port,()=>console.log(`express listening on port ${port}! `))
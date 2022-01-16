const express = require('express');
const app = express()
const port = 5000
const {User} = require('./models/User')

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//application/json
app.use(express.json());


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://kwengwoo:4325118@firstnode.eq5cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>console.log("Mongoose Connected...")).catch(err=>console.log(err));

app.get('/',(req,res)=>{
 res.send("node welcome!")
});


app.post('/api/users/register',(req,res)=>{
    //회원가입 할 때 필요한 정보들을 client 가져오면
    //그것을 db에 넣어준다.

    const user = new User(req.body)

    //save는 mongo db에 함수이다.

    user.save((err,doc)=>{
        if(err) return res.json({success : false,err})
        return res.status(200).json({
            success:true
        })

    })

})



app.listen(port,()=>console.log(`express listening on port ${port}! `))
const express = require('express');
const app = express()
const port = 5000
const {User} = require('./models/User')


const config = require('./config/key')
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//application/json
app.use(express.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(()=>console.log("Mongoose Connected...")).catch(err=>console.log(err));

app.get('/',(req,res)=>{
 res.send("nodemon 으로 change 완료")
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
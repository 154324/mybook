const express = require('express');
const app = express()
const port = 5000
const {User} = require('./models/User')
const cookieParser = require('cookie-parser');
const {auth} =require('./middleware/auth')
const {Book}=require('./models/Book')
var randomString=require('randomstring')
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//application/json
app.use(express.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://kwengwoo:4325118@firstnode.eq5cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>console.log("Mongoose Connected...")).catch(err=>console.log(err));

app.get('/',(req,res)=>{
 res.send("nodemon 으로 change 완료")
});

//proxy를 서정하여 키게 되면 개발자 콘솔에 안녕하세요가 뜬다.
app.get('/api/hello',(req,res)=>{
    res.send("안녕하세요")
})


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


app.post('/api/users/login',(req,res)=>{
    //로그인 구현 
    //요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({email : req.body.email},(err,user)=>{
      if(!user){
        return res.json({
          loginSuccess : false, 
          message : "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
    
  
    //요청된 이메일이 db에 있다면 비밀번호까지 맞는지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({loginSuccess:false,message :"비밀번호가 틀렸습니다."})
    
  
  
    //비밀번호 까지 맞다면 토큰을 생성하기.
  
    user.generateToken((err,user)=>{
      if(err) return res.status(400).send(err);
      res.cookie("x_auth",user.token)
      .status(200)
      .json({loginSuccess:true,userId : user._id})
  
  
    })
    })
  })
  })
  
  
  app.get('/api/users/auth', auth,(req,res)=>{
  
    //여기 까지 미들웨어를 통과해 왔다는 얘기는 auth가 true 라는 말
  
    res.status(200).json({
      _id:req.user._id,
      isAdmin : req.user.role === 0?false:true,
      isAuth : true,
      email : req.user.email,
      name : req.user.name,
      lastname : req.user.lastname,
      role : req.user.role,
      image: req.user.image
    })
  })
  
  
  app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},
      {token :""},
      (err,user)=>{
        if(err) return res.json({success :false,err});
        return res.status(200).send({
          success:true
        })
      }
      )
  
  
  })




//book

app.post('/api/users/uploadbook',(req,res)=>{
  

  const book = new Book({
      writer: req.body.token,
			title: req.body.title,
			contents: req.body.contents,
			noticeToken: randomString.generate(12), // 랜덤한 문자열 12자리 생성
  })

  //save는 mongo db에 함수이다.

  book.save((err,cb)=>{
      if(err) return res.json({success : false,err})
      return res.status(200).json({
          success:true
      })
  })
})
app.get('/api/users/getList', async(req, res) => {
  let list = await Book.find(); // 전체 리스트 불러오기.
  return res.status(200).json({ data: list });
});

app.get('/api/users/noticeToken',  async(req, res) => {
  let book = await Book.findOne({ noticeToken: req.params.noticeToken });
  if (book) {
    let user = await User.findOne({ token: book.writer }); // 작성자 이름을 얻기 위해, 토큰으로 검색
    return res.status(200).json({ data: { ...book._doc, writerName: user.name } });
  }
  return res.status(500).json({ message: 'Notice Not Found' });
});

app.post('/api/users/comment', async (req, res) => {
	let user = await User.findOne({ token: req.body.token }); // 댓글 작성할 유저
	let book = await Book.findOne({ noticeToken: req.body.noticeToken });

	book.comment.push({
		// 가져온 notice 객체 ( find로 찾은 notice는 _id가 존재하며, 스키마의 객체입니다. )
		// 따라서 이러한 문법을 복잡한 update query 없이 사용할 수 있습니다.
		username: user.name,
		content: req.body.content,
	});
	try {
		await notice.save(); // 가져오고 수정한 notice를 다시 save합니다.
		return res.status(200).json({ message: 'success!' });
	} catch (e) {
		return res.status(500).json({ message: 'Save Fail!' });
	}
});

var client_id = 'MmyiakDAo_rpa1eij2jo';
var client_secret = 'TwvacCPYFX';
app.get('/api/search/book', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.query.query); // json 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(5000, function () {
   console.log('http://127.0.0.1:5000/search/book?query=검색어 app listening on port 5000!');
 });
const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    writer: {
        type:String
    },
    title: {
        type: String,
        maxlength: 50
    },
    contents: {
        type: String
    },
    noticeToken: {
        type: String,
        
    },
    views: {
        type: Number,
        default: 0
    },
    writeDate:{
        type:Date,
        default : new Date()
    },
    comment: [//댓글 달기 추가
		{
			username: String, // 댓글 작성자 이름
			content: String, // 댓글 내용
			date: { type: Date, default: new Date() }, // 작성 시간
		},
	],
    
})


const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }
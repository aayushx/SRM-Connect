var express = require('express');//imports express js
var bodyParser = require('body-parser');//enable the express app to read the incoming body
var logger = require('morgan');//for logging all http request 
var methodOverride = require('method-override')//allows to use put and delete request
var cors = require('cors');
var mysql = require('mysql');//cross origin resource sharing enables ionic to communicate with server
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false   }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
const router  = express.Router();
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"connect_2",
    
    });

router.post('/uploadquestion',(req,res)=>{
    const question = req.body.question
    const date = req.body.date
    const description = req.body.description
    const userid = req.body.userid
    const questionid = Date.now()
    const time = req.body.time
    const comments = 0
    const qtype = req.body.qtype
    const upvotes = 0
    const downvotes = 0
    const name = req.body.username
    var sql = 'INSERT INTO question (questionid, question, date, description, userid, time, comments, qtype, upvotes, downvotes, name) VALUES ("'+questionid+'","'+question+'","'+date+'","'+description+'","'+userid+'", "'+time+'", "'+comments+'", "'+qtype+'", "'+upvotes+'", "'+downvotes+'", "'+name+'")';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json({
                success:true,
                status:200
            })
        }
    })

})
router.get("/disquestions",(req,res)=>{

    var sql= 'select * from question';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})
router.post("/disanswers",(req,res)=>{
    var questionid = req.body.questionid
    

    var sql= 'select * from answers where (questionid) = ("'+questionid+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})
router.post("/delquestion",(req,res)=>{
    var questionid = req.body.questionid
    

    var sql= 'delete from question where (questionid) = ("'+questionid+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})
router.post("/delanswer",(req,res)=>{
    var answer = req.body.answer
    var questionid=req.body.questionid

    var sql= 'delete from answers where (answers) = ("'+answer+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})

})
router.post("/answers",(req,res)=>{
var questionid = req.body.questionid
var answers = req.body.answer
var userid = req.body.userid
var date = req.body.date
var time = req.body.time
var upvotes = 0
var downvotes = 0
var username = req.body.username

    var sql= 'insert into answers (questionid , answers , userid, date, time, upvotes, downvotes, username) values ("'+questionid+'","'+answers+'","'+userid+'","'+date+'","'+time+'","'+upvotes+'","'+downvotes+'","'+username+'")';

    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})

router.post("/filter",(req,res)=>{
    var category = req.body.category
    

    var sql= 'SELECT *  FROM question WHERE qtype  = ("'+category+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})

router.post("/search",(req,res)=>{
    var term = req.body.term
    

    var sql= 'SELECT *  FROM question WHERE CONCAT(question, description) LIKE ("%'+term+'%")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})

router.post("/inc_count",(req,res)=>{
    var questionid=req.body.questionid
    var sql= 'update question set comments=comments+1 where questionid like ("'+questionid+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})
router.post("/dec_count",(req,res)=>{
    var questionid=req.body.questionid
    var sql= 'update question set comments=comments-1 where questionid like ("'+questionid+'")';
    

 
    con.query(sql,(err,result)=>{
      
        if(err){
            console.log(err);
            
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)

            console.log(result);
        }
        
})
})

router.post("/doupvote",(req,res)=>{
    var userid = req.body.userid
    var answerid = req.body.answerid
    var sql = 'select * from upvotes where (userid) = ("'+userid+'") and (answerid) = ("'+answerid+'")';
    con.query(sql,(err,result)=>{
if(result.length!=0){
    
    res.json({
        success:false,
        status:500
    })
}
else{
    var sql = 'insert into upvotes (userid,answerid) values ("'+userid+'","'+answerid+'")';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json({
                success:true,
                status:200
            })
            var sql2 = 'select * from upvotes where (answerid) = ("'+answerid+'")'
    con.query(sql2,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            // res.json(result)
            console.log(result);
            console.log(result.length);
            var votes = result.length;
            var sql3 = 'UPDATE answers SET upvotes = ("'+votes+'") WHERE answerid = ("'+answerid+'")'
            con.query(sql3,(err,result)=>{
                if(err) throw err;
                else{
                    console.log('done voting')
                } 
            })
        }
            })
        }
    })
  
}
    })
    
})
router.post("/upvote",(req,res)=>{
    
    var userid = req.body.userid
    var sql = 'select * from upvotes where (userid) = ("'+userid+'")';
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                status:400
            })
        }
        else{
            res.json(result)
            console.log(result);
            console.log(result.length);
        }
            })
           
})

module.exports = router;

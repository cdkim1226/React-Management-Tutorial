const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
//export된것 import하는 부분, db_config의 connection을 
//server.js의 db변수에 할당함. server.js의 db == db_config의 connection

const db = require('./config/db_config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// 1. db연결할때 config 파일에 .env로 설정해두면 보안에 좋다
// 2. 서버는 server.js를 통해 모듈화를 하는데 routes, views로 나누어 페이지별?로 관리한다
// 3. routes에서는 분류한 로직 내에 요청 처리 역할
// 4. views 에서는 html을 출력하는데 ejs라는 통신 템플릿 엔진을 써서 출력한다

//사용자가 품목을 추가하면 크롤링을 수행한다.
//크롤링 데이터를 저장한다.
// 사용자가 품목을 선택하면 저장된 데이터를 보여준다.

//1 크롤링 수행
//2 크롤링데이터 저장
//3 크롤링데이터 API 제공

const multer = require('multer');
const upload = multer({dest: './upload'});


//ejs view engine setting
app.set("views", path.join(__dirname, "views"));
app.set("view engin", "ejs");

//라우팅 -> url에 맞게 요청을 보내주는( 분기 )것 이라고 생각하시면되는데
//클라이언트가 localhost/api/test에 접근을 했을때,
///api/post?10 ~ ?2000
//app.get('/post10)
//app.get('/post11)
//app.get('/post12)
//그 요청에 맞게 응답을 해주는 것
//라우팅 모듈화
const customerAPI = require("./routes/api");
const { connect } = require('./config/db_config');
app.use("/api", customerAPI);
// const data = fs.readFileSync('./database.json');
// const conf = JSON.parse(data);
// const mysql = require('mysql');
// //connection => db 
// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database
// });

db.query('select * from customer',function(err, results, fields){
  if(err){
    console.log(err);
  }
    console.log(results);
});
// app.get('/api/customers', (req, res)=>{
//   let sql = `select * from customer`;

//   //sql문 따로 뺴기, 예외처리 추가
//   //db.query인자명 통일 rows -> result 
//   try{
//     db.query(sql, (err, rows, fields) => {
//         console.log(rows);
//         res.send(rows);
//       }
//     );
//   }catch(err){
//     if (err) console.error(err);
//     }
// });

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO customer VALUES(NULL,?,?,?,?,?,now(),0)';
  let image = '/image' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  db.query(sql, params,
    (err, results, fileds) => {
      res.send(results);
      console.log(err);
      console.log(results);
    });
});

app.delete('/api/customers/:id',(req, res) => {
  let sql = 'update customer set isDeleted = 1 where id = ?';
  let params = [req.params.id];
  db.query(sql, params,
    (err, results, fields) => {
      res.send(results);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
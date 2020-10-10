const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./database.json"));
const conf = JSON.parse(data);
//왜못읽죠 ㅣㅣㅋㅋ .아니 config 현재위치에 database.json 뽑는건데 음.
const mysql = require('mysql');
//connection => db 
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect((err) => {
  if (err) console.error(err);
})

// 다른파일이 import할 수 있게 export해주는 부분
//db connection을 사용할 수 있도록 export

module.exports = connection; // 여기다 설명하실때 주석도 간단하게 부탁드려도될까요
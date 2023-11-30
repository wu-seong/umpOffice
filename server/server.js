const express = require("express"); // npm i express | yarn add express
const cors = require("cors"); // npm i cors | yarn add cors
const mysql = require("mysql"); // npm i mysql | yarn add mysql
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const PORT = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
  host: "ump.cfbrdgww2cly.ap-northeast-2.rds.amazonaws.com", // 호스트
  user: "root", // 데이터베이스 계정
  password: "60192234", // 데이터베이스 비밀번호
  database: "ump", // 사용할 데이터베이스
});

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get("/api/employee_name", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT name FROM Employee";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/technology_name", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const sqlQuery = "SELECT name FROM Technology";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/api/scenario1", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const data = req.body.data;

  const sqlQuery = `SELECT 
  E.name, 
  PP.ID as Programmer_Project_ID, 
  PP.join_start_date, 
  PP.join_end_date, 
  PP.programmer_ID, 
  PP.project_ID, 
  D.name as Duty_Name,
  P.name as Project_Name,
  P.start_date as Project_Start_Date,
  P.end_date as Project_End_Date,
  P.description as Project_Description
FROM 
  Employee E
INNER JOIN 
  Programmer_Project PP ON E.ID = PP.programmer_ID
INNER JOIN 
  Duty D ON PP.duty_ID = D.ID
INNER JOIN
  Project P ON PP.project_ID = P.ID
WHERE 
  E.name = (?)
    `;

  db.query(sqlQuery, [data], (err, result) => {
    res.send(result);
  });
});

app.post("/api/scenario2", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const data = req.body.data;

  const sqlQuery = `SELECT T.name AS Technology_Name, 
        COUNT(TP.technology_ID) AS Usage_Count, 
        E.name AS Developer_Name,
        E.ID AS Developer_ID
    FROM 
        Technology T
    INNER JOIN 
        Tech_Project TP ON T.ID = TP.technology_ID
    INNER JOIN 
        Research_Tech RT ON T.ID = RT.technology_ID
    INNER JOIN 
        Employee E ON RT.researcher_ID = E.ID
    WHERE
        T.name = (?)
    GROUP BY 
        T.name, 
        E.name, 
        E.ID
    ORDER BY 
        E.ID ASC`;

  db.query(sqlQuery, [data], (err, result) => {
    res.send(result);
  });
});

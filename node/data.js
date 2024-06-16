const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3002;

// กำหนดค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "data",
});

// เชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:", err);
    throw err;
  }
  console.log("เชื่อมต่อฐานข้อมูลสำเร็จ");
});

app.post("/adduser", (req, res) => {
  const { fullName, nickName, birthDate, gender, age } = req.body;
  const sql =
    "INSERT INTO users (fullName, nickName, birthDate, gender, age) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [fullName, nickName, birthDate, gender, age], (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล", err);
      res.status(500).send(err.sqlMessage || "เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    } else {
      res.send("เพิ่มข้อมูลสำเร็จ");
    }
  });
});

app.get("/getusers", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } else {
      res.send(result);
    }
  });
});

/// อัพเดทข้อมูลผู้ใช้
app.put("/updateuser/:id", (req, res) => {
  const userId = req.params.id;
  const { fullName, nickName, birthDate, gender, age } = req.body;
  const sql = `UPDATE users SET fullName = ?, nickName = ?, birthDate = ?, gender = ?, age = ? WHERE id = ?`;
  const values = [fullName, nickName, birthDate, gender, age, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการอัพเดทข้อมูล", err);
      res.status(500).send("เกิดข้อผิดพลาดในการอัพเดทข้อมูล");
    } else {
      res.send("อัพเดทข้อมูลสำเร็จ");
    }
  });
});

// ลบข้อมูลผู้ใช้
app.delete("/deleteuser/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, userId, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล", err);
      res.status(500).send("เกิดข้อผิดพลาดในการลบข้อมูล");
    } else {
      res.send("ลบข้อมูลสำเร็จ");
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

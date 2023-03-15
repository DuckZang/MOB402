const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var tinhtoan = require('./tinhtoan');

app.listen(4040, () => {
  console.log("Application started and Listening on port 4040");

});
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/caculator.html");
  });

  app.post("/", (req, res) => {
    let soA = + req.body.soA
    var soB = + req.body.soB

    

   res.send(
    "Tổng = " + tinhtoan.Cong(soA,soB) + "--------------"
   + "Hiệu = " + tinhtoan.Tru(soA,soB) + "--------------"
   + "Tích = " + tinhtoan.Nhan(soA,soB) + "--------------"
   + "Thương = " + tinhtoan.Chia(soA,soB) + "\n");
  });
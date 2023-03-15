const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(4040, () => {
  console.log("Application started and Listening on port 4040");
  console.log(__dirname);
});
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/test.html");
  });
  
  app.post("/", (req, res) => {
    var subName = req.body.yourname
    var subEmail = req.body.youremail;
   res.send("Hello " + subName + ", Thank you for subcribing. You email is " + subEmail);
  });;
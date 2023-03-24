const express = require('express')
const path = require('path') 
var expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
const multer = require('multer');
const fs = require('fs');
const { error } = require('console');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
 var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var dir = './Assignment/image';
        if(fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }
        cb(null, dir)
  },
  filename: function(req, file, cb){
    // file.originalname
    cb(null, Date.now() +'.png');
  }
 });
 var upload = multer({ storage: storage});



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded())
app.engine('hbs', expressHbs.engine());
app.engine('.hbs', expressHbs.engine({extname: "hbs"}));


// //app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, '/views'))
app.use(express.static("image"));

var product =[{idProduct: 1, name: 'Áo hermet',type:'áo',price: 10000,img:'https://bizweb.dktcdn.net/100/345/460/products/untitled-2-3.jpg?v=1646193082747', color:'blue'},
  {idProduct: 2, name: 'Quan Doncel hermet',type:'quần',price: 330000,img:'http://ebon.vn/data/product/29/33/74/quan-jogger-nam-gap-xuat-xin-jg16-1468316192-225.jpg', color:'black'},
  {idProduct: 3, name: 'Áo Dong Phuc',type:'áo',price: 2220000,img:'https://down-vn.img.susercontent.com/file/sg-11134201-23020-s5gbkrmfc0mv50_tn', color:'red'}]
var user = [{idUser:1, fullname: 'Dinh Cong Cuong', email: 'cuongdc@gmail.com', password:'123456',avatar: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'},
{idUser:2, fullname: 'Pham Duc Giang', email: 'duckzang@gmail.com', password:'123abc',avatar: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'},
{idUser:3, fullname: 'Nguyen Minh Duc', email: 'ducmn@gmail.com', password:'123',avatar: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'}]

app.get('/home', (req, res) => {
  res.render('home',{product: product});
});
app.get('/product', (req, res) => {
  res.render('product');
});
app.get('/account', (req, res) => {
  res.render('taikhoan',{user: user});
});

app.get("/login", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/views/indexx.html",{user:user});
});
app.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  let checkLogin = user.some(value => value.email === username && value.password === password); 
  
  if(checkLogin){
    res.redirect('home')
  }
  else{
    res.send("dang nhap khong thanh cong")
  }
})
app.get("/register", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/register.html");
});
app.post("/register", function (req, res) {
  // add new user
  user.push(req.body);
  res.redirect('login')
});

app.post("/home/add",upload.single('img'), function (req, res, next) {
  // const file = req.file;
  //   if (!file) {
  //     const error = new Error('Please upload a file')
  //     error.httpStatusCode = 400
  //     return next(error)
  // }
  // add new user
  product.push(req.body);
  res.redirect('/home')
});








const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)});
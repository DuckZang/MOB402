const express = require('express')

//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

const app = express()

//app.engine('.hbs', ExpressHandlebars());
app.engine('.hbs', expressHbs.engine({extname: "hbs", defaultLayout: 'page2', layoutsDir: "views/layouts/"}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

//app.use(express.static(__dirname));
// app.get("/", function (req, res) {
//     console.log(__dirname);
//     res.sendFile(__dirname + "/index.html");
// });

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const path = require('path') 
var expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
let listLop = [];
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded())
app.engine('hbs', expressHbs.engine());
app.engine('.hbs', expressHbs.engine({extname: "hbs"}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
var uri = 'mongodb+srv://giangpdph27260:ducgiang2003@cluster0.fpfyqmh.mongodb.net/test2?retryWrites=true&w=majority'
// connect to mongodb server
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// create collection 
let lopSchema = mongoose.Schema({
    name: { 
        type: String
    },
    numberStudent : {
        type : Number
    }
});
let Lop = mongoose.model('Lop', lopSchema);

app.get('/', async (req, res, next) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    await Lop.find({}).then(lops => {
        res.render('home', {lops: lops.map(Lop => Lop.toJSON())
        });
    })
});
app.get('/form-add', async (req, res, next) =>{
    res.render('form-add')
} )
app.post('/add', async (req, res, next) =>{
    const add = new Lop(req.body);
    await add.save();
    res.redirect('/')
});
app.get('/form-update/:id', (req, res, next) =>{
   Lop.findById(req.params.id), (err, data) => {
    res.render('form-update', {lops:data})
   }
} )


const port = 3030

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)});
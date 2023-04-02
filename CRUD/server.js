const express = require('express')
const path = require('path')
var expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded())
app.engine('hbs', expressHbs.engine());
app.engine('.hbs', expressHbs.engine({ extname: "hbs" }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
var uri = 'mongodb+srv://giangpdph27260:ducgiang2003@cluster0.fpfyqmh.mongodb.net/product?retryWrites=true&w=majority'
// connect to mongodb server
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// create collection 
let ProductSchema = mongoose.Schema({
    stt: {
        type: Number
    },
    tenSP: {
        type: String
    },
    gia: {
        type: Number
    },
    soLuong:{
        type: Number
    }
});
let Product = mongoose.model('product', ProductSchema);

app.get('/', async (req, res, next) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    await Product.find({}).then(products => {
        res.render('home', {
            products: products.map(Product => Product.toJSON())
        });
    })
});
app.get('/form-add', async (req, res, next) => {
    res.render('form-add')
})
app.post('/add', async (req, res, next) => {
    const add = new Product(req.body);
    await add.save();
    res.redirect('/')
});

// app.get('/:id', async (req, res, next) => {
//       await Product.findOne({id : req.params.id}), (err, data) => {
//             res.render('form-update', { products: data})
//     }
// });

app.post("/delete", async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.body.id });
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/edit", async (req, res) => {
    try {
      await mongoose.connect(uri).then(console.log("connect success"));
      const products = await Product.findOne({ _id: req.body.id });
      if (products) {
        products.stt = req.body.stt;
        products.tenSP = req.body.tenSP;
        products.gia = req.body.gia;
        products.soLuong = req.body.soLuong;
        await products.save();
        res.redirect("/");
      }
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
  

const port = 3030

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
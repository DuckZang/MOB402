const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs');
const { error } = require('console');

app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        var dir = './uploads/';
        if(fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var tenGoc = file.originalname;
        arr = tenGoc.split('.');
        let newFilename = '';
        for (var i = 0; i < arr.length; i++) {
            if (i != arr.length - 1){
                newFilename += arr[i];
            }else{
                newFilename += ('-' + Date.now()+ '.'+ 'jpeg');
            }
        }
        cb(null, newFilename)
    }
})

var upload = multer({ storage: storage, limits:{fileSize:1*1024*1024}})

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    // if(multer.MulterError.fileSize){
    //     const error = new Error('Kich thuoc file lon hon 1MB')
    //     error.httpStatusCode = 400
    //     return next(error)
    //  }
    
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
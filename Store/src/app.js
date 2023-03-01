const express = require("express");
const db = require('../generics/db/db.js');
const path = require("path");
const hbs = require('hbs')
const bodyparser = require('body-parser');
const session = require('express-session')
const fileUpload = require("express-fileupload");
const setup = require('../controllers/setup');
const uploadCsv = require('../controllers/uploadCSVProducts');

// routes 
const route_users = require('../routes/index')

const multer = require("multer")

const excelStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'csvFile')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },

})
const excelUpload = multer({ storage: excelStorageEngine });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_ " + file.originalname)
    }
})

var upload = multer({
    storage: storage
    //files is the name of file attribute
})
    .single("files");

const Port = 4700;

const app = express()
app.post("/SetUp", (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            res.send(err)
        }
        else {
            if (res.req.file) {
                var filePath = path.join(__dirname, "../", res.req.file.path);
            } else {
                await db.select().from('store').then(async (store_res) => {
                    res.render('SetUp', {
                        error: 'Please Choose File',
                        btn_name: 'Save',
                        data: store_res
                    })
                }).catch((err) => {
                    res.render('SetUp', {
                        error: 'Unable to Fetch data from database',
                        btn_name: 'Save',
                        data: store_res
                    })
                })
            }

            if(res.req.file != undefined){
            setup.AddSetUp(req, res, filePath);
            }
        }
    })
})

app.post("/SetUp/Edit/:Id", function (req, res, next) {
    var Id = req.params.Id;
    if (Id != undefined) {
        upload(req, res, function (err) {
            if (err) {
                res.send(err)
            }
            else {
                if (res.req.file) {
                    var filePath = path.join(__dirname, "../", res.req.file.path);
                }
                setup.UpdateSetUp(req, res, { filePath });
            }
        })
    }
})

app.post('/uploadFile', excelUpload.single('file'), uploadCsv.UploadCSVData); 

app.use(bodyparser.urlencoded({ extended: true }))

// Passing fileUpload as a middleware
app.use(fileUpload());

const pageDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../views')
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)

hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

app.use(express.static(pageDirectory))
app.use(session({
    secret: 'key1',
    resave: false,
    saveUninitialized: false
}))

app.use(route_users);

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        description: 'This Page doesn\'t exist',
    })
})



app.listen(Port, () => {
    console.log('server is up at port:' + Port);
})
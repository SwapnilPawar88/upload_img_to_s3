const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
require("./src/db/conn");

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
  });

  const Urlmodel = require("./src/model/urlModel");

aws.config.update({
    secretAccessKey: '',
    accessKeyId: '',
    region: '',
});

const s3 = new aws.S3();
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
            || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'angular-upload',
        key: function (req, file, cb) {
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
        }
    })
});


app.post('/api/upload', upload.array('file', 1), async (req, res) => {
    // console.log(req.files[0].location);
    console.log(req.file);
    res.send({ file: req.file});

    const save_url = {
        Location : req.files[0].location
    }

    // saving to MongoDB
    try{
        const resultUrl =  new Urlmodel(save_url);
        const result = await resultUrl.save()
        console.log("Url Saved in DB ... ");
    }catch(err){
        console.log(err);
    }
});

app.get('/', (req, res) => {
    res.send("Hello Form Express js");
});

app.listen(8000, () => {
    console.log('Server listening on port 8000!');
});
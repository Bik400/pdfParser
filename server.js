// var express = require('express');
// var multer = require('multer');
// var cors = require('cors');
// const { unstable_trace } = require('scheduler/tracing');

// var app = express();

// app.use(cors());

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// var upload = multer({storage: storage}).single('file');

// app.post('/upload', (req, res) => {
//     upload(req, res, err => {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err);
//         } else if (err) {
//             return res.status(500).json(err)
//         }

//         return res.status(200).send(req.file);
//     })
// })
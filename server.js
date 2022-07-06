const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const fs = require('fs');   // file module

const app = express();

app.use(cors());
app.use(fileUpload());

// let readMe = fs.readFileSync('public/uploads/text1.rtf', 'utf8').split('\n');
// console.log(readMe);

// Upoad Endpoint
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

    let readMe = fs.readFileSync(`public/uploads/${file.name}`, 'utf8').split('\n');
    console.log(readMe);

    file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    });

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");

// const app = express();
// const port = 8080;

// app.use(cors());

// const storage = multer.memoryStorage();
// const upload = multer({storage: storage});

// // app.get("/", (req, res) => {
// //     // res.sendFile(path.join(__dirname + "/index.js"));
// //     res.sendFile()
// // })

// app.post("/upload", upload.single("file"), (req, res, next) => {
//     const file = req.file;

//     if (!file) {
//         const error = new Error("Please upload a file");
//         error.httpStatusCode = 400;
//         return next(error);
//     }

//     const multerText = Buffer.from(file.buffer).toString("utf-8");

//     const result = {
//         fileText: multerText
//     }

//     res.send(result);
// })

// app.listen(port, () => {
//     console.log(`server listening on port ${port}`);
// })

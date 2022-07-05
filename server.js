const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 8080;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// app.get("/", (req, res) => {
//     // res.sendFile(path.join(__dirname + "/index.js"));
//     res.sendFile()
// })

app.post("/upload", upload.single("file"), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }

    const multerText = Buffer.from(file.buffer).toString("utf-8");

    const result = {
        fileText: multerText
    }

    res.send(result);
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

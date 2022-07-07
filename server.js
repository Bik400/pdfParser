const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());


// Upoad Endpoint
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

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

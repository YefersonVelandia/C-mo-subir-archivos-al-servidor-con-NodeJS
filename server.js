const PORT = process.nextTick.PORT || 3000;
const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({

    destination:(req, file, cb) =>{
        cb(null, './subidas')
    },
    filename:(req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer( { storage: storage } )

app.use( express.json() );
app.use(express.urlencoded( { extended: true} ));

app.get('/', (req, res)=> {
    // return res.send('home page')
    console.log(__dirname);
    res.sendFile(__dirname + "/views/index.html");
})


app.post('/subir', upload.single('avatar'), (req, res) =>{
    console.log(`Storage location is ${req.hostname} / ${req.file.path}`);
    return res.send(req.file);
})


app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`)); 
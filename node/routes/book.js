const express= require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const { verifyToken  } = require('./middlewares');
const { Book } = require('../models');

const router = express.Router();

router.use(cors({
    credentials: true,
    // origin: 주소를 써주면 해당 주소만허용, 기본값 *
}))

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', (req, res) => {
    Book.findAll({
        order: [
            ['id', 'DESC'],
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        })
});

router.post('/', 
    verifyToken, 
    upload.fields([{ name: 'file1'}, { name: 'file2'}]), 
    async (req, res) => {
    try {
        await Book.create({
            title: req.body.title,
            contents: req.body.contents,
            frontimg: req.files.file1 && req.files.file1[0].filename,
            backimg : req.files.file2 && req.files.file2[0].filename,
        });
        
        res.send(true);
    }catch (error) {
        console.error(error);
    }
});

router.patch('/:id', 
    verifyToken, 
    upload.fields([{ name: 'file1'}, { name: 'file2'}]), 
    async (req, res) => {
    const dataObj = {
        title: req.body.title,
        contents: req.body.contents,
    }
    if (req.files.file1) dataObj.frontimg = req.files.file1[0].filename
    if (req.files.file2) dataObj.backimg = req.files.file2[0].filename

    await Book.update(dataObj,{ where: { id: req.params.id } });
    
    res.send(true);
});
// , (error) => {
//     if (error) return error;
//     return true;
// }

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const bookData = await Book.findAll({
            where: { id: req.params.id}
        })  
        let filePath ='';
        Promise.all(['frontimg', 'backimg'].map((val) => {
                if (!bookData[0][val]) return;
                filePath = path.join(__dirname, '/../uploads', bookData[0][val]);
                return fs.promises.unlink(filePath);
            }))
            .then(async () => {
                await Book.destroy({ where: { id: req.params.id } })         
                let data = await Book.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                })
                res.send({ result: true, list: data });
            })
            .catch(error => {
                res.status(504).send('요청을 처리할 수 없습니다.');    
                console.error(error);
            })
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const bookData = await Book.findAll({
            where: { id: req.params.id}
        })          
        res.send(bookData);    
    } catch (error) {
        console.error(error);
    }
});

router.get('/limit/:number', (req, res) => {
    Book.findAll({
        limit: Number(req.params.number),
        order: [
            ['id', 'DESC'],
        ],
    })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        })
});

router.get('/uploads', (req, res) => {
    fs.readFile()
});

module.exports = router;
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { verifyToken } from './middlewares';
import Book from '../models/book';

const router = express.Router();

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

interface Ifile {
    [key: string] :[Express.Multer.File]
}

router.post('/', 
    verifyToken, 
    upload.fields([{ name: 'file1'}, { name: 'file2'}]), 
    async (req, res) => {
    try {
        const files = req.files as Ifile
        await Book.create({
            title: req.body.title,
            contents: req.body.contents,
            frontimg: files['file1'] && files['file1'][0].filename,
            backimg : files['file2'] && files['file2'][0].filename,
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
    const files = req.files as Ifile
    const dataObj = {
        title: req.body.title,
        contents: req.body.contents,
        frontimg : '',
        backimg : '',
    }
    if (files['file1']) dataObj.frontimg = files['file1'][0].filename
    if (files['file2']) dataObj.backimg = files['file2'][0].filename

    await Book.update(dataObj,{ where: { id: req.params.id } });
    
    res.send(true);
});
// , (error) => {
//     if (error) return error;
//     return true;


router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const bookData = await Book.findOne({
            where: { id: req.params.id}
        })  
        let filePath ='';
        Promise.all([
                () => {
                    if(bookData){
                        if (!bookData.frontimg) return;
                        filePath = path.join(__dirname, '/../uploads', bookData.frontimg);
                        return fs.promises.unlink(filePath);
                    }
                    return;
                },
                () => {
                    if(bookData){
                        if (!bookData.backimg) return;
                        filePath = path.join(__dirname, '/../uploads', bookData.backimg);
                        return fs.promises.unlink(filePath);
                    }
                    return;
                },
                
            ]
            // ['frontimg', 'backimg'].map((val) => {
            //     if(bookData){
            //         if (!bookData[val]) return;
            //         filePath = path.join(__dirname, '/../uploads', bookData[val]);
            //         return fs.promises.unlink(filePath);
            //     }
            //     return;
            // })
            )
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
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        })
});

// router.get('/uploads', (req, res) => {
//     fs.readFile()
// });

export default router;
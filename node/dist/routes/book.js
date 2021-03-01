var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "multer", "path", "fs", "./middlewares", "../models/book"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const multer_1 = __importDefault(require("multer"));
    const path_1 = __importDefault(require("path"));
    const fs_1 = __importDefault(require("fs"));
    const middlewares_1 = require("./middlewares");
    const book_1 = __importDefault(require("../models/book"));
    const router = express_1.default.Router();
    try {
        fs_1.default.readdirSync('uploads');
    }
    catch (error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs_1.default.mkdirSync('uploads');
    }
    const upload = multer_1.default({
        storage: multer_1.default.diskStorage({
            destination(req, file, done) {
                done(null, 'uploads/');
            },
            filename(req, file, done) {
                const ext = path_1.default.extname(file.originalname);
                done(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    });
    router.get('/', (req, res) => {
        book_1.default.findAll({
            order: [
                ['id', 'DESC'],
            ],
        })
            .then((data) => {
            res.send(data);
        })
            .catch((error) => {
            res.send(error);
        });
    });
    router.post('/', middlewares_1.verifyToken, upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const files = req.files;
            yield book_1.default.create({
                title: req.body.title,
                contents: req.body.contents,
                frontimg: files['file1'] && files['file1'][0].filename,
                backimg: files['file2'] && files['file2'][0].filename,
            });
            res.send(true);
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.patch('/:id', middlewares_1.verifyToken, upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookData = yield book_1.default.findOne({
            where: { id: req.params.id }
        });
        const files = req.files;
        const dataObj = {
            title: req.body.title,
            contents: req.body.contents,
            frontimg: bookData.frontimg,
            backimg: bookData.backimg,
        };
        if (files['file1'])
            dataObj.frontimg = files['file1'][0].filename;
        if (files['file2'])
            dataObj.backimg = files['file2'][0].filename;
        yield book_1.default.update(dataObj, { where: { id: req.params.id } });
        res.send(true);
    }));
    // , (error) => {
    //     if (error) return error;
    //     return true;
    router.delete('/:id', middlewares_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookData = yield book_1.default.findOne({
                where: { id: req.params.id }
            });
            let filePath = '';
            Promise.all([
                () => {
                    if (bookData) {
                        if (!bookData.frontimg)
                            return;
                        filePath = path_1.default.join(__dirname, '/../uploads', bookData.frontimg);
                        return fs_1.default.promises.unlink(filePath);
                    }
                    return;
                },
                () => {
                    if (bookData) {
                        if (!bookData.backimg)
                            return;
                        filePath = path_1.default.join(__dirname, '/../uploads', bookData.backimg);
                        return fs_1.default.promises.unlink(filePath);
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
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield book_1.default.destroy({ where: { id: req.params.id } });
                let data = yield book_1.default.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                });
                res.send({ result: true, list: data });
            }))
                .catch(error => {
                res.status(504).send('요청을 처리할 수 없습니다.');
                console.error(error);
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookData = yield book_1.default.findAll({
                where: { id: req.params.id }
            });
            res.send(bookData);
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.get('/limit/:number', (req, res) => {
        book_1.default.findAll({
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
        });
    });
    // router.get('/uploads', (req, res) => {
    //     fs.readFile()
    // });
    exports.default = router;
});

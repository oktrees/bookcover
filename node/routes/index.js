const express = require('express');
const cors = require('cors');

const router = express.Router();

router.use(cors({
    credentials: true,
    // origin: 주소를 써주면 해당 주소만허용, 기본값 *
}))

// router.get('/:id', (req, res) => {
//     console.log(req.params)
//     res.send('Hello, Express');
// });

router.route('/')
    .get((req, res, next) => {
        res.render('index', {title: 'nodeweb'})
    })
    .post((req, res) => {
        res.send('POST /abc')
    })
// router.get('/', function(req, res, next) {
//     console.log('test');
//     next('route');
// }, function(req, res, next) {
//     console.log('실행되지 않습니다.')
// }, function(req, res, next) {
//     console.log('실행되지 않습니다.')
// })

// router.get('/', function(req, res) {
//     console.log('실행됩니다');
//     res.send('Hello, Express')
// })

module.exports = router;

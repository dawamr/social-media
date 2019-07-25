const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
// const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');
const Users = mongoose.model('Users');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
    res.render('form',{ title: 'Register form' });
});
router.get('/login', (req, res) => {
    const session = req.session;
    if(session.email && session.pass) {
        res.send('Sudah Login!')
    }
    res.render('sosmed/login',{ title: 'Login' });
});
router.get('/register', (req, res) => {
    res.render('sosmed/register',{ title: 'Register' });
});
router.get('/users', (req, res) => {
    const data = Users;
    data.find({}, (err,data) => {
        if(err)
            return res.send(err)
        res.json(data);
    })
});
router.post('/register',(req, res)=>{
    const user = new Users(req.body);
    user.save()
    .then((req, res) => {res.send('Thank you for your registration!');}) 
    .catch(() => { res.send('Sorry! Something went wrong.'); });
    // res.render('sosmed/register',{ title: 'Register' });
})
router.post(
    '/', 
    // [
    // body('name')
    //     .isLength({ min: 5 })
    //     .withMessage('Please enter a name min 5 character'),
    // body('email')
    //     .isLength({ min: 8 })
    //     .withMessage('Please enter an email min 8 character'),
    // ], 
    (req, res) => {
        // const errors = validationResult(req);

        // if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
            .then(() => { res.send('Thank you for your registration!'); })
            .catch(() => { res.send('Sorry! Something went wrong.'); });
        // } else {
        // res.render('form', {
        //     title: 'Registration form',
        //     errors: errors.array(),
        //     data: req.body,
        //     });
        // }
    // res.render('form', { title: 'Registration form' });
});
router.get('/registrations', auth.connect(basic),(req, res) => {
    Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;
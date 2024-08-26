const express = require('express');
const router = express.Router();


// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update, purchaseHistory,signup,signin,signout,requireSignin } = require('../controllers/auth');
const {validationRules, validation} = require('../validator')
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});
router.post('/signup', validationRules(),validation(),signup);
router.post('/signin',signin);
router.get('/signout',signout);
// router.get('/user/:userId', requireSignin, isAuth, read);
// router.put('/user/:userId', requireSignin, isAuth, update);
// router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

// router.param('userId', userById);

module.exports = router;

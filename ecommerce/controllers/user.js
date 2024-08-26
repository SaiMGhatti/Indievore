const User = require('../models/user')
const { Order } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec().then((user) => {
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    }).catch((err) =>{
        console.log(err)
        res.status(400).json({
            error: 'User not found'
        });
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// exports.update = (req, res) => {
//     console.log('user update', req.body);
//     req.body.role = 0; // role will always be 0
//     User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'You are not authorized to perform this action'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json(user);
//     });
// };

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.profile._id }).then((user) => {
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save().then((updatedUser) => {
            if (updatedUser) {
                updatedUser.hashed_password = undefined;
                updatedUser.salt = undefined;
                res.json(updatedUser);
                
            }
        }).catch((err)=>{
            console.log('USER UPDATE ERROR', err);
            return res.status(400).json({
                error: 'User update failed'
            });
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(400).json({
            error: 'User not found'
        });
    })
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }).then(data => {
        if (data) {
            next(); 
        }
    }).catch(error=>{
        res.status(400).json({
            error: 'Could not update user purchase history'
        });
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.findOne({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec().then(orders => {
            if (orders) {
                res.json(orders);
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                error: errorHandler(err)
            });
        });
};




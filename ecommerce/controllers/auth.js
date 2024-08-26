const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorhandler')

exports.signup = (req, res) => {
    console.log("req.body",req.body);
    const user = new User(req.body);
    
    user.save().then(()=>{
        res.json({user});
    }).catch((err)=>{
        
        console.log(err);
        res.status(400).json({err:errorHandler(err)});
    });
};

exports.signin = (req, res) => {
    //find user based on email
    const {email, password} = req.body
    User.findOne({email}).then((user) => {
        // if(err || !user){
        //     return res.status(400).json({
        //         err: "User with that email does not exist. Please signup"
        //     });
        // }
        // if user is found make sure the email and password match
        // create authenticate
        console.log(User.schema.methods);
        // Validate the user's password
        hashed_password = user.hashed_password
    //   user.comparePassword(password,hashed_password, (compareErr, isMatch) => {
    //     if (compareErr) {
    //       console.error('Error comparing passwords:', compareErr);
    //     } else {
    //       if (!isMatch) {
    //         return res.status(401).json({
    //             error: "Email and password dont match"
    //         });
    //       } 
    //     }
    //   });
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password dont match"
            })
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}});
    
    }).catch((err) => {
        console.log(err);
        res.status(400).json({
                    err: "User with that email does not exist. Please signup"
                });
    });

};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Signout success"});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};



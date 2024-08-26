const { check, validationResult } = require("express-validator") 

//this sets the rules on the request body in the middleware
exports.validationRules = () => {
    return [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Email must be between 3 to 32 characters')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32
            }),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
        //you can now add other rules for other inputs here, like username, email...
        // notice how validation rules of a single field is chained and not seperated
    ]
}

//while this function executes the actual rules against the request body
exports.validation =  ()  => {
    return (req, res, next) => {
        //execute the rules
        const errors = validationResult(req)
        // check if any of the request body failed the requirements set in validation rules
        if (!errors.isEmpty()) {
            // heres where you send the errors or do whatever you please with the error, in  your case 
            const extractedErrors = []
            console.log("errors = "+ errors )
            errors.array().map(err => extractedErrors.push( err.msg ));
            console.log("extractedErrors = "+ extractedErrors )
            return res.status(400).json({  
                errors: extractedErrors[0],
            });
        }
        // if everything went well, and all rules were passed, then move on to the next middleware
        next();   
    }
}

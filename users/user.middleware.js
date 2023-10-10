const joi = require ('joi')


const ValidateUserCreation = async (req, res, next) => {
try {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            phone_number: joi.string().max(10).required(),
            gender: joi.string().valid('male', 'female').required()
        })
        
        const valid = await schema.validateAsync(req.body)
        if (valid.error){
            const userCreationError = new Error (valid.error.message);
            userCreationError.status = 422;
            throw userCreationError;
            // return res.status(422).json({
            //     message: valid.error,
            //     success: false
            // })
        }else{
            console.log("valid user details entry")
        }
    
    
     
    
        // if (!req.body.username || !req.body.username.trim()) {
        //     return res.status(400).json({
        //         error: 'username is required'
        //     })
        // }
    
        // if (!req.body.password || !req.body.password.trim()) {
        //     return res.status(400).json({
        //         error: 'password is required'
        //     })
        // }
    
        
    next();
    
} catch (error) {
    next(error)
}
}


const loginValidation = async (req, res, next) => {
    try {
            const schema = joi.object({
                email: joi.string().email().required(),
                password: joi.string().required()
            })
            
            const valid = await schema.validate(req.body, { abortEarly: true })
            if (valid.error){
                const loginError = new Error (valid.error.message);
                loginError.status = 422;
                throw loginError;
            }else{
                console.log("login credientials valid")
            }
        
            
        next();
        
    } catch (error) {
        next(error)
    }
    }

module.exports = {
    ValidateUserCreation,
    loginValidation
}
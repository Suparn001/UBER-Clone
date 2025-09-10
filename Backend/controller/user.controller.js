const { authUser } = require("../middleware/auth.middleware");
const userModel = require("../models/user.model");
const userService = require("../services/user_service");
const { validationResult } = require("express-validator");
const blacklistTokenSchema = require("../models/blacklistToken.model");




module.exports.registerUser = async(req,res,next) => {
const errors = validationResult(req);

if(!errors.isEmpty()){
    
return res.status(400).json({
    errors: errors.array()
});
}


try{
const { fullName, email, password } = req.body;

const hashedPassword = await userModel.hashPassword(password);
const user = await userService.createUser({
    
        firstName:fullName.firstName,
        lastName:fullName.lastName,
    email,
    password: hashedPassword
});


const token = user.generateAuthToken();

res.status(201).json({
    token,
    user
});
}catch(err){
res.status(500).json({
    message:"something went wrong",
    error: err.message
});
}
};





module.exports.loginUser = async(req,res,next) =>{

    const errors = validationResult(req);

if(!errors.isEmpty()){
    
return res.status(400).json({
    errors: errors.array()
});
}


const {email,password} =req.body;
try{
    const user = await userModel.findOne({email}).select("+password");

    if(!user){
res.status(401).json({
    message:"Invalid email or password"
});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
res.status(401).json({
    message:"Invalid email or password"
});
    }
    const token = user.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({
        token,
        user
    })
}catch(err){
    return res.status(500).json({
        message:"something went wrong",
        error: err.message
    });
}
};





module.exports.getUserProfile = async (req, res, next) => {
   
    return res.status(200).json(req.user);
}




module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
await blacklistTokenSchema.create({ token });

    return res.status(200).json({
        message: "Logged out successfully"
    });
}
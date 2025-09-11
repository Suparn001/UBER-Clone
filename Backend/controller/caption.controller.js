const captionModel = require('../models/caption.model');
const { validationResult } = require('express-validator');
const captionService = require('../services/caption.service');
const BlacklistToken = require("../models/blacklistToken.model"); // ✅ correct import

module.exports.registerCaption = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const { fullname, email, password, vehicle } = req.body;
        console.log("Registering caption:", fullname, email,password);
        console.log("Vehicle details:", vehicle);
        const isCaptionALreadyExist = await captionModel.findOne({ email });
        if(isCaptionALreadyExist){
            return res.status(400).json({message: "Caption already exists"});
        }
        const hashedPassword = await captionModel.hashPassword(password);

        const caption = await captionService.createCaption({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email: email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = caption.generateAuthToken();
        return res.status(201).json({token, caption});
    } catch (error) {
        return next(error);
    }
}



module.exports.loginCaption = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});  
    }

    try {
        const { email, password } = req.body;
        const caption = await captionModel.findOne({ email }).select("+password");
        if (!caption) {
            return res.status(400).json({ message: "Invalid email or password" });
        } 
        
        const isMatch = await caption.comparePassword(password);

        console.log(isMatch);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = caption.generateAuthToken();
      return  res.status(200).json({ token, caption });

    }
    catch (error) {
       return res.status(500).json({ message: "Internal server error" , error});
    }
}


module.exports.getCaptionProfile = async (req, res, next) => {
   
    return res.status(200).json(req.caption);
}






module.exports.logoutCaption = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Use the model
    await BlacklistToken.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

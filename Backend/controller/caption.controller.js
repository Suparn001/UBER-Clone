const captionModel = require('../models/caption.model');
const { validationResult } = require('express-validator');
const captionService = require('../services/caption.service');

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
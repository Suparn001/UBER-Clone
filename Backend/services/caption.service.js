const model = require('../models/caption.model');



module.exports.createCaption = async({
    firstname, lastname, email, password,
    color, plate,
    capacity,
    vehicleType
})=> {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){ 
        throw new Error("All Fields are required");
}
    const caption = model.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
       vehicle: {    // ✅ nest everything properly
    color,
    plate,
    capacity,
    vehicleType   // make sure schema spelling is fixed!
  }
    });
    return caption;
}
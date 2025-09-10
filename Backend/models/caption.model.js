const mongoose = require('mongoose');
const validator = require('validator');
const  jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

const captionSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name must be atleast 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last Name must be atleast 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        required: true,
        type: String,
        select: false,
        minlength: [6, "Password must be atleast greater 6 characters long"]
    },
    socketId: {
        type: String,
    },
    
    //Add the following details whether caption is available to take rides or not
    vehicle:{
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    color: {
        type: String,
        required: true,
        minlength: [3, "Color must be atleast 3 characters long"]
    },
    plate: {
        type: String,
        required: true,
        minlength: [3, "Plate must be atleast 3 characters long"]
    },
    capacity: {
        type: String,
        required: true,
        minlength: [1, "Capacity must be atleast 1"]
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'auto']
        },
        location: {
        lat: {
        type:Number,
            },
            long: {
                type: Number,
                
            }
    }
        
}

});

captionSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn:'1d'});
  return token;
};

captionSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captionSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captionModel = mongoose.model('caption', captionSchema);

module.exports = captionModel;
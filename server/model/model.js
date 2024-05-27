const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },

        gender:String,
        status:String,
    },
    {
        timestamps: true
    }
)

const UserDB = mongoose.model('userdb', schema)
module.exports= UserDB;
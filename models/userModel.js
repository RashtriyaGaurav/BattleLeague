const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI}/BattleLeague`)

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    ffname:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    coins:{
        type:Number,
        default:3
    },
    tournaments:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('user', userSchema);
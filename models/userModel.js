const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI}/BattleLeague`)

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    ffname: String,
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\S+$/.test(v); // no spaces allowed
            },
            message: props => `${props.value} is not a valid username! No spaces allowed.`
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    coins: {
        type: Number,
        default: 3
    },
    tournaments: {
        type: Array,
        default: []
    },
    followers:{
        type: Array,
        default: []
    }
});


module.exports = mongoose.model('user', userSchema);
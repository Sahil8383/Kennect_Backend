const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
},
{
    collection: 'Kennect_Users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
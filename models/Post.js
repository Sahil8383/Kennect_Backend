const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    made_by: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },
    content: { type: String, required: true },
    comments: [
        {
            commented_by: { type: String, },
            content: { type: String, required: true }
        }
    ]
},
{
    collection: 'Kennect_Posts'
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
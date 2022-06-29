const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    userId:  {type:Types.ObjectId, ref: 'User'},
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});


module.exports = model('UserToken',schema);
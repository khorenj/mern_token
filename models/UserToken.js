const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    userId:  {type:Types.ObjectId, ref: 'User'},
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 }, // 30 days  30 * 86400
});


module.exports = model('UserToken',schema);
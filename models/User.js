const {Schema, model, Types} = require('mongoose');


const userTypes = Object.freeze({
	Admin:'admin',
	Manager:'manager',
	Agent:'agent'
})

const getOverrideType = () =>
{
	let obj = JSON.parse(JSON.stringify(filterTypeObject));
	obj.parentFilter = {type:Types.ObjectId, ref: 'FilterTypes'};
	return obj;
}

const mcSchema =  new Schema({
	name:{type:String},
	mcNumber:{type:String},
	lines:[
		{type:Number}
	]
});
// mongoose.model('address',addressModelSchema ,'address' )


const schema = new Schema({
	email:{type:String, requred:true, unique:true},
	password:{type:String, requred:true},
	userType:{
		type: String,
		enum : Object.values(userTypes),
		default: userTypes.Agent
	},
	parent: {type:Types.ObjectId, ref: 'User'},
	isDeleted:{type:Boolean, default:false},
	isActive:{type:Boolean, default:true},
	emailHash:{type:String},
	isEmailVerified:{type:Boolean, default:true},
	emailHashDate:{type:Date},
	previousPaymentDate:{type:Date},
	date:{type:Date},
})

Object.assign(schema.statics, {
	userTypes,
});

module.exports = model('User',schema);
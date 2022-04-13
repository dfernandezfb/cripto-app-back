const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  email:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  password:{
    type:String,
    trim:true,
    required:true,
  },
  role:{
    type:'String',
    required: true,
    enum:['USER', 'ADMIN'],
    default:'USER'
  }
},{
  versionKey:false,
  timestamps:true
});

module.exports= model('User', UserSchema);
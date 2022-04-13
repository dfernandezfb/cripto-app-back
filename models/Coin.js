const { Schema, model } = require('mongoose');

const CoinSchema = new Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  abbreviation:{
    type:String,
    required:true,
    trim:true
  }
},{
  versionKey:false,
})

module.exports = model('Coin', CoinSchema);
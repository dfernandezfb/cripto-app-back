const Coin = require("../models/Coin");
const User = require("../models/User");

exports.getCoins = async (req, res)=>{
  try {
    const id = req.userId;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if(user.role === 'ADMIN'){
      const coins = await Coin.find();
      res.status(200).json({ok:true, coins:coins});
    }else{
      res.status(404).json({ok:false, message:'Usted no tiene permisos'})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'});
  }
}
exports.getCoin = async (req, res)=>{
  try {
    const id = req.params.id;
    const coin = await Coin.findById(id);
    res.status(200).json({ok:true, coin:coin});
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'});
  }
}

exports.addCoin = async (req,res)=>{
  try {
    const newCoin = new Coin(req.body);
    const coinAdded = await newCoin.save();
    res.status(201).json({ok:true,coinAdded: coinAdded})
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'});
  }
}

exports.deleteCoin = async (req,res)=>{
  try {
    const id = req.params.id;
    await Coin.findByIdAndDelete(id);
    res.status(200).json({ok:true, message:'Eliminación correcta'});
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'});
  }
}
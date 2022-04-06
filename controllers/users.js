const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');

exports.login = async (req, res)=>{
  try {
    // const {email, password} = req.body;
    const user = await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({ok:false, message:'Credenciales incorrectas'});
    }
    const passwordCheck = await bcrypt.compare(req.body.password,user.password);
    if(!passwordCheck){
      return res.status(400).json({ok:false, message:'Credenciales incorrectas'});
    }
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'});
    res.status(200).json({ok:true, token:token});
  } catch (error) {
    console.log(error);
    res.status(401).json({mensaje:'Credenciales no validas'})
  }
}

exports.addUser = async (req,res) =>{
  try {
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password:encryptedPassword
    });
    await newUser.save();
    res.status(201).json({ok:true, message:'El usuario fue creado correctamente'})
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'})
  }
}

exports.getAuth = async (req,res)=>{
  try {
    const id = req.userId;
    const user = await User.findById(id).select('-password');
    res.status(200).json({ok:true, user:user})
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'})
  }
}
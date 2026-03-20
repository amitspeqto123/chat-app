
const {signup} = require('../services/user.service');
const {login} = require('../services/user.service');

const signupControlle = async (req, res) =>{
    console.log(req.body)
    try{
        const {name, email, password, image} = req.body;
        const user = await signup({name, email, password, image});
        res.status(201).json({message: "User created successfully", user})
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const loginController = async (req, res) =>{
    console.log(req.body)
    try{
        const {email, password} = req.body;
        const user = await login({email, password});
        res.status(200).json({message: "User logged in successfully", user: user.user, token: user.token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

module.exports = {signupControlle, loginController}
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (data) =>{
    const existsUser = await User.findOne({email: data.email});
    if(existsUser){
        throw new Error("User already exists");
    }
    const password = bcrypt.hashSync(data.password, 10);
    data.password = password;
    const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
    });
    return user;   
}

const login = async ({email, password}) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch){
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1h'});
    return {
        token,
        user
    }
}

module.exports = {signup, login}
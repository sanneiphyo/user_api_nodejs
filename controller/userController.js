import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js"

//desc      Auth user/set token
//route     POST/api/users/auth
//@access   Public
const authUser =asyncHandler( async (req,res) =>{

  const {name,email,password} = req.body;
  
  const user = await User.findOne({email})

  if(user){
    generateToken(res,  user._id)
    res.status(201).json({
        _id : user._id,
        name : user.name,
        email: user.email,
       
    })
}else{
    res.status(400)
    throw new Error(`Invalid email or password`)
}
  
});



//desc      Register a new user
//route     POST/api/users
//@access   Public
const registerUser =asyncHandler( async (req,res) =>{
        const {name,email,password } = req.body;

        const userExits = await User.findOne({email})//email matchs email send

        if(userExits){
            res.status(400);
            throw new Error('User Already Exit')
        }
        {/**this from model */}
        const user = await User.create({  
            name,
            email,
            password
        });

        if(user){
          generateToken(res,  user._id)
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email: user.email,
               
            })
        }else{
            res.status(400)
            throw new Error(`Invalid user data`)
        }

});


//desc      Logout user
//route     POST/api/users/logout
//@access   Public
const logoutUser =asyncHandler( async (req,res) =>{

  

    res.status(200).json({message : 'logout user'})
});


//desc      Get user profile 
//route     get/api/users/profile
//@access   Private
const getUserProfile =asyncHandler( async (req,res) =>{

    res.status(200).json({message : 'User profile'})
});



//desc      Update user profile 
//route     PUT/get/api/users/profile
//@access   Private
const updateUserProfile = asyncHandler( async (req,res) =>{

    res.status(200).json({message : 'Update user profile'})
});


export {

    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
const express=require('express');
const User = require('../models/User');
const router=express.Router();
const {body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchUser=require('../middleware/fetchuser');

const JWT_SECRET="thi$isIn0teBook"

//Route1: Create a user using: POST "/api/auth/signup". No Login required
router.post('/signup',
            [body('name','Name is required').isLength({min: 2}),
            body('email',"Enter a valid email").isEmail(),
            body('password','Password should have atleast 5 characters').isLength({min: 5})],
            async(req,res)=>{
              const errors = validationResult(req);
              if (!errors.isEmpty()) {   
                res.status(400).json({ errors: errors.array() });
              }
              try {
                let user=await User.findOne({email:req.body.email})//user is a document or an instance of User model
              if(user){
                return res.status(400).json({error:"Sorry a user with this Email already exists"})
              }
              const salt=await bcrypt.genSalt(10);
              const secPass=await bcrypt.hash(req.body.password,salt);
              user= await User.create({
                name:req.body.name,
                email:req.body.email,
                password:secPass
              });
              const data={
                user:{
                  id:user.id
                }
              }
              const authToken=jwt.sign(data,JWT_SECRET)
              res.json({authToken})
              //res.json(user)
              }
              catch (error) {
                console.error(error.message)
                res.status(500).send("Internal Server Error");
              }
            }
          )

//Route 2: Authenticate a user login using: POST "/api/auth/login". No Login required
router.post('/login',
            [body('email',"Enter a valid email").isEmail(),
            body('password','Password cannot be empty').exists()],
            async(req,res)=>{
              const errors = validationResult(req);
              let success=false;
              if (!errors.isEmpty()) {   
                res.status(400).json({ success, errors: errors.array() });
              }
              const {email,password}=req.body
              try {
                let user=await User.findOne({email})//user is a document or an instance of User model
                if(!user){
                  return res.status(400).json({success, error:"Please enter correct credentials to login"})
                }
                const passwordCompare=await bcrypt.compare(password,user.password)
                if(!passwordCompare){
                  return res.status(400).json({success, error:"Please enter correct credentials to login"})
                }
                const payLoad={
                  user:{
                    id:user.id
                  }
                }
                const authToken=jwt.sign(payLoad,JWT_SECRET)
                success=true;
                res.json({success, authToken})
              } catch (error) {
                console.error(error.message)
                res.status(500).send("Internal Server Error");
              }
            }
          )   

//Route 3: Get logged in user details using: POST "/api/auth/login". Login required
router.post('/getuser',fetchUser,
            async(req,res)=>{
              try {
                userId=req.user.id;
                const user= await User.findById(userId).select("-passwprd")
                res.send(user)
              } catch (error) {
                console.error(error.message)
                res.status(500).send("Internal Server Error");
              }
            })

module.exports=router
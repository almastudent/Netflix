import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";

const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log(fullname,email,password)

    if (!fullname || !email || !password) {
      return res.status(401).send({
        message: "Invalid Data",
        success: "failed",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ // Status code for bad request
        message: "Email is already in use",
        success: false,
      });
    }

    // Implement password hashing and salting here before saving the user

    const hashedPassword=await bcrypt.hash(password,10)

    await User.create({
       fullname:fullname,
       email:email,
        password:hashedPassword
       });

    return res.status(201).send({
      message: "Registered successfully",
      success:true
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({ // Status code for internal server error
      message: "Registration failed",
    });
  }
};

export default Register;







export const login=async (req,res)=>{

    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email,password)
      
       
      if( !email || !password){
        return res.status(401).send({
          message:"Invalid data",
          success:true
        })
      }

      
      const matchedUser= await User.findOne({email});
     
      if(!matchedUser){
        return res.status(401).send({
       message:"Email is not registered",
       success:true
        })
      }

        const matchedPassword=await bcrypt.compare(password,matchedUser.password)

      if(!matchedPassword){
        return res.status(401).send({
          message:"Invalid username or password",
          success:true
        })

        
      }



      const tokenData={
        id:User._id
      }

      const token = jwt.sign(tokenData,"kdiiefjkfsfjkerthyhxcsiopjnksd",{expiresIn:"1h"})

        return res.status(200).cookie("token", token,{httpOnly:true}).json({
          message:`welcome back ${matchedUser.fullname}`,
          success:true
        })




    } catch (error) {

      console.log("error for login:",error)

    }



}



export const logout=(req , res)=>{
  return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()), httpOnly:true}).json({
    message:"Logged Out Successfully",
    success:true
  })
}

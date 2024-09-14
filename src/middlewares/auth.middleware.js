import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req,res,next) =>{
    const token =
    req.cookies?.accessToken ||
    req.headers("Authorization")?.replace("Bearer ", "");

    const knownToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!knownToken){
     return res.status(401, "unauthorized request")   
    }
    const user = User.findById(knownToken._id).select("-password -refreshToken")
    if (!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    req.user = user
    next()
}

export {verifyJWT}
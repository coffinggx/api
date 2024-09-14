import { User } from "../models/user.model.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Couldn't generate tokens: " + error.message);
    }
};
const registerUser = async(req,res) =>{
    const {username , password} = req.body;
    if( !username && !password){
        return res.status(400).json({
            message: "Username and password field mustnot be empty"
        })

    }
    const existedUser = User.findOne({username})
    if(!existedUser){
        return res.status(400).json({
            message:"User already exist"
        })
    }
    const user = User.create({username, password});
    res.status(201).json({
        message:"User created successfully"
    })
    
}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Provided password is incorrect" });
        }
        
        let accessToken, refreshToken;
        try {
            ({ accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id));
        } catch (tokenError) {
            return res.status(500).json({ message: tokenError.message });
        }
        
        res.cookie("accessToken", accessToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production" 
        });
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production" 
        });
        
        return res.status(200).json({
            accessToken,
            refreshToken,
            message: "User Logged in Successfully"
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};

const logoutUser = async (req,res) =>{
    const userID = req.user._id;
    await User.findByIdAndUpdate(userID, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new:true
    }

)
const options ={
    httpOnly: true,
    secure:true
}
res.clearCookie("accessToken", options)
res.clearCookie("refreshToken", options)
return res.status(200).json({
    message: "User Logged out Successfully"
})

}

export {loginUser, registerUser, logoutUser}
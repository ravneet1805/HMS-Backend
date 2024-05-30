const { model } = require("mongoose");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signUp = async (req, res) =>  {

        const { firstName,
            lastName,
            email,
            phoneNumber,
            age,
            gender,
            password,
            accountType, 
            qualification, 
            specialization, 
            experience 
        } = req.body;

        try {
            const existingUser = await userModel.findOne({ email: email });
    
            if (existingUser) {
                return res.status(400).json({ message: "User Already Exists." });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            if(accountType == "patient"){
                
                const result = await userModel.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    age: age,
                    gender:gender,
                    password: hashedPassword,
                    accountType: accountType,
                    
    
                });
        
                const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
                console.log(process.env.SECRET_KEY)
                console.log(result)
                res.status(201).json({
                    user: result,
                    token: token,
                });
            }
            else if(accountType == "doctor"){
                const result = await userModel.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    age: age,
                    gender:gender,
                    password: hashedPassword,
                    accountType: accountType,
                    qualification: qualification,
                    specialization: specialization,
                    experience: experience,
                });
        
                const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
                console.log(process.env.SECRET_KEY)
                console.log(result)
                res.status(201).json({
                    user: result,
                    token: token,
                });
            }
    
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Something went wrong.");
        }

};


const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User Not Exist." });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect Password." });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY
        );

        res
            .status(201)
            .json({ message: "Login Success", user: existingUser, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong." });
    }
};




module.exports = { signIn, signUp };
const express = require("express")
const connectDB = require("./src/config/database")
const app = express();
const User = require("./src/models/user");
const { validateSignup } = require("./src/utils/validation");
const cookieParser = require("cookie-parser")
const { userAuth } = require("./src/middlewares/auth");

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Data Coming From Server")
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("EmailId is not present")
        }

        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {

            const token = await user.getJWT();

            console.log(token);


            // Add the token to cookie and send response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })
            res.send("Login SuccessFull!!!")
        } else {
            throw new Error("Password is not correct");
        }
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.post("/singup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        //validation of data
        validateSignup(req)
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("User Added Succesfully!")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.get("/profile",userAuth, async(req, res) => {
    try {

        const user = req.user;
        if(!user){
            throw new Error("User does not exist");
        }
        
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
        
    }
})

connectDB()
    .then(() => {
        console.log("Database connection established....")
        app.listen(5000, () => {
            console.log(`server is running on port 5000`)
        })
    })
    .catch((err) => {
        console.log("Database cannot be connected!!!")
    })



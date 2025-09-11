const express = require("express")
const connectDB = require("./src/config/database")
const app = express();
const User = require("./src/models/user");
const { validateSignup } = require("./src/utils/validation");
const bcrypt = require('bcrypt');

app.use(express.json());

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

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
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



const express = require("express")
const connectDB = require("./src/config/database")
const app = express();
const User = require("./src/models/user")

app.get("/", (req, res)=>{
    res.send("Data Coming From Server")
})

app.post("/singup", async (req, res) => {
    const user =new User({
        firstName : "Gulshan",
        lastName : "Singh",
        emailId : "gulshan@gmail.com",
        password : "Gulshan@123"
    });
    await user.save();
    res.send("User Added Succesfully!")
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



const express = require("express")
const connectDB = require("./src/config/database")
const cookieParser = require("cookie-parser")

const app = express();


app.use(express.json());
app.use(cookieParser())

const authRouter = require("./src/routes/auth.route")
const profileRouter = require("./src/routes/profile.route")
const requestRouter = require("./src/routes/request.route")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


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



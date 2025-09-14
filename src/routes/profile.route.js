const express = require("express");
const { userAuth } = require("../middlewares/auth")


const router = express.Router();

router.get("/profile",userAuth, async (req, res) => {
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

router.patch("/profile/edit", userAuth, async = () => {

});

module.exports = router;
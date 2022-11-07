const express = require('express');
const router = express();

router.use("/api/user",require("./UserRoutes"));

//test roter

router.get("/", (req,res)=>{
    res.send("API Working!")
})

module.exports = router;
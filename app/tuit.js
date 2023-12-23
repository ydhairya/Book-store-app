const express = require("express");
const app = express();
app.use('/static',express.static('static'));
const port = 4000;
app.get("/",(req,res)=>{
        res.send("The App is running succesfully");
})
app.listen(port , ()=>{
    console.log(`The App is running at ${port} port`);
})

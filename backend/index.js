require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const ProductRouter = require("./Routes/ProductRouter");
 
require('./models/db');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/products",ProductRouter)

const PORT = process.env.PORT || 8080;


app.get("/ping",(req,res)=>{
    res.send('PONG');
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
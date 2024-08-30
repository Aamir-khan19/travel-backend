require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const authRouter = require('./routes/auth.js');
const fs = require("fs");
const { saveUserData } = require('./controller/user.js');

const publicKey = fs.readFileSync(path.resolve(__dirname, "./public.key"), 'utf-8');

const server = express();

//db connection
main().catch(err => console.log("Error in database ->",err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected'); 
}



const auth = (req, res, next)=>{
  try {
  const token = req?.get('Authorization')?.split('Bearer ');
  
    var decoded = jwt.verify(token[1], publicKey);
   
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).send({error: error.message});
  }
};


server.use(cors());
server.use(express.json());  
server.use(express.urlencoded());
server.use(morgan('combined')); 
// server.use('/auth', authRouter);
// server.use('/products', productRouter); 
// server.use("/users", userRouter);



server.post("/data", saveUserData)


server.use("*", (req, res)=>{

  res.status(404).json("Not found any mathching resource")
});





server.listen(process.env.PORT, ()=>{
    console.log('server started');
});
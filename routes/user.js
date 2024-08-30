const express = require('express');
const { getAllusers, getCurrentUser, updateCurrentUser, deleteUser, saveUserData} = require("../controller/user.js");
const userRouter = express.Router();



module.exports = userRouter;

userRouter
.get('/', getAllusers)
.get('/user', getCurrentUser)
.post("/data", saveUserData)
.patch('/user', updateCurrentUser);

userRouter.use("*", (req, res)=>{
  console.log("not found erroeroere");
    res.sendStatus(404);
  })


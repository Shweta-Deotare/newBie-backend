const express = require('express');

const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const userRouter = require('./routes/userRouter');

const bodyParser = require('body-parser');

const cors = require('cors');



app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

app.use(bodyParser.json());


const db = require('./model/index.js');
db.testConnection();

app.use(cors({
    origin:"*"
}));

//routes
app.use("/", userRouter.allUsers);
app.use("/", userRouter.userLogin);
app.use("/", userRouter.registerUser);


//dummy "/test" route
app.get("/test", (req, res)=>{
    res.json("This is an express app.");
})
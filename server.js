import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';

connectDB();

const app = express()


app.use(express.json())//give raw json
app.use(express.urlencoded({extended : true}))//give form data

//routes
app.use('/api/users',userRoutes)

//user middleware
app.use(notFound);
app.use(errorHandler);

//auth middleware
app.use(cookieParser());

app.get ( '/',(req,res)=> res.send('Server is ready'))
app.listen(port, ()=> console.log(`Sever started on port${port}`))





{/**
        POST/api/users - Register a user
        POST/api/users/auth - authenticate a user and get token
        POST/api/users/logout - Logout user and clear cookie
        GET/api/users/profile - Get userProfile
        PUT/api/users/profile -update profile

*/}

//35:21 postman adding
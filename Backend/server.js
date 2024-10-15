import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import productRouter from './routes/product.route.js'
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

//middleware that allows us to parse req.body 
//allows us to accept json data into req.body
app.use(express.json());

app.use('/api/products', productRouter)

//server.listen
app.listen(PORT,()=>{
    connectDb();
    console.log('Server started on http://localhost:8000')
});
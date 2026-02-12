import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/modules/shorturl.model.js";

dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/api/create',(req,res)=>{
    const {url} = req.body;
    const shortUrl = nanoid(7);
    const newUrl = new urlSchema({
        full_url : url,
        short_url : shortUrl
    })
    newUrl.save();
    res.send(shortUrl);
})

app.listen(5000,()=>{
    connectDB()
    console.log("Server running at http://localhost:5000");
})
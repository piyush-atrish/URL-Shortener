import express from "express";
import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shorturl.route.js";
import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/create', shortUrl);

app.get('/:id', redirectFromShortUrl)

app.listen(5000,()=>{
    connectDB()
    console.log("Server running at http://localhost:5000");
})
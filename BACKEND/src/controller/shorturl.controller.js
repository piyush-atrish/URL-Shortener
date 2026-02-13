import { createShortUrlWithoutUser } from "../services/shorturl.services.js";
import dotenv from "dotenv";
import { findUrlFromShortUrl } from "../dao/shorturl.js";

dotenv.config("../.env");

export const createShortUrl = async (req,res)=>{
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL+shortUrl)
}

export const redirectFromShortUrl = async(req,res) =>{
    const {id} = req.params;
    const url = await findUrlFromShortUrl(id);
    if(url){
        res.redirect(url.full_url)
    }
    else{
        res.status(404).send("Not Found");
    }
}
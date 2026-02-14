import { createShortUrlWithoutUser } from "../services/shorturl.services.js";
import dotenv from "dotenv";
import { findUrlFromShortUrl } from "../dao/shorturl.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiError } from "../utils/errorHandler.js";

dotenv.config("../.env");

export const createShortUrl = wrapAsync(async (req,res)=>{
    const {url} = req.body;
    if(!url){
        throw new ApiError(400, "Please provide a valid URL");
    }
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL+shortUrl)
});

export const redirectFromShortUrl = wrapAsync(async(req,res) =>{
    const {id} = req.params;
    const url = await findUrlFromShortUrl(id);
    if(url){
        res.redirect(url.full_url)
    }
    else{
        throw new ApiError(404, "Short URL not found or has expired");
    }
});
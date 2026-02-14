import { saveShortUrl } from "../dao/shorturl.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async(url) =>{
    let isSaved = false;
    let shortUrl;
    while(!isSaved){
        shortUrl = await generateNanoId(7);
        try{
            await saveShortUrl(shortUrl,url)
            isSaved = true;
        } catch(error){
            if(error.code === 11000){
                console.warn(`Collision detected for ID: ${shortUrl}. Generating a new one...`);
            } else{
                throw error;
            }
        }
    }
    return shortUrl;
}

export const createShortUrlWithUser = async(url,userId) =>{
    let isSaved = false;
    let shortUrl;
    while(!isSaved){
        shortUrl = await generateNanoId(7);
        try{
            await saveShortUrl(shortUrl,url,userId)
            isSaved = true;
        } catch(error){
            if(error.code === 11000){
                console.warn(`Collision detected for ID: ${shortUrl}. Generating a new one...`);
            } else{
                throw error;
            }
        }
    }
    return shortUrl;
}

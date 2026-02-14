import urlSchema from "../modules/shorturl.model.js";

export const saveShortUrl = async(shortUrl,longUrl,userId)=>{
    const newUrl = new urlSchema({
        full_url : longUrl,
        short_url : shortUrl
    })
    if(userId){
        newUrl.user = userId;
    }
    await newUrl.save();
}

export const findUrlFromShortUrl = async(id) => {
    return await urlSchema.findOneAndUpdate({short_url:id},{$inc:{clicks:1}});
}
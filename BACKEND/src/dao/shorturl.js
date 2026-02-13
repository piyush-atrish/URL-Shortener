import urlSchema from "../modules/shorturl.model.js";

export const saveShortUrl = async(shortUrl,longUrl,userId)=>{
    const newUrl = new urlSchema({
        full_url : longUrl,
        short_url : shortUrl
    })
    if(userId){
        newUrl.user = userId;
    }
    newUrl.save();
}

export const findUrlFromShortUrl = async(id) => {
    return await urlSchema.findOne({short_url:id});
}
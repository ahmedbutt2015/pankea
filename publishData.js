const axios = require('axios')


module.exports.publishData =async (subscribers,topic,data) => {
    console.log("sending....: ",data);
    const results = await Promise.all(subscribers.map(x=> {
        return axios.post(x,{
            "topic":topic,
            "data":data
        })
        .catch(x=>x)
    }))
    return results.map(x=>{
        return {"url":x.config.url,"send":x.status?"yes":"no"}
    })
}
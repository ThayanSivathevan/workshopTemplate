const {LolApi} = require("twisted")
const api = new LolApi(require("../constants/constants.json").API_KEY)


module.exports = (req,res,next)=>{
    summonerByName(req.params).then(res=>{
        req.userData = res.response
        next()
    }).catch((e)=>{
        res.status(401).json({error:"Summoner Does not exist"})
    })
}


async function summonerByName ({name:summonerName,region}){
    return await api.Summoner.getByName(summonerName,region)
}
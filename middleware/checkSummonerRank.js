const {LolApi} = require("twisted")
const api = new LolApi(require("../constants/constants.json").API_KEY)

module.exports = (req,res,next)=>{
    summonerRankByID(req.userData.id,req.params.region).then(res=>{
        let ranked = res.response
        let ranked_dictionary  = {}
        ranked.forEach((item,i)=>{
            let queue = item.queueType
            item.total = item["wins"]+item["losses"]
            item.winrate =  item["wins"]/item["total"]
            if(item.miniSeries){
                item.promos=item["miniSeries"]["progress"].replace("N","X")
            }
            ranked_dictionary[queue]=item
        })
        req.userData.ranked=ranked_dictionary
        next()
    }).catch((e)=>{
        console.log(e)
        res.status(401).json({error:"Summoner Does not have ranked"})
    })
}


async function summonerRankByID(id,region){
    return await api.League.bySummoner(id,region)
}
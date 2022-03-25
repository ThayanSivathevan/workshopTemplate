const {LolApi} = require("twisted")
const api = new LolApi(require("../constants/constants.json").API_KEY)
const champions = require("../constants/champions.json")
const getImage = require("../util/getImage")
module.exports = (req,res,next)=>{
    summonerMasteryByID(req.userData.id,req.params.region).then(res=>{
        let mastery = res.response

        let arr=[]
        for(let i=0;i<=Math.min(mastery.length,10);i++){
            let temp = {}
            temp.champion = champions[mastery[i].championId]
            if(temp.champion=="MonkeyKing")temp.champion="Wukong"
            temp.level=mastery[i].championLevel
            temp.points = mastery[i].championPoints
            temp.url = getImage("champion",temp.champion)
            arr.push(temp)
        }
        req.mastery=arr
        next()
    }).catch((e)=>{
        console.log(e)
        res.status(401).json({error:"Summoner Does not have mastery"})
    })
}


async function summonerMasteryByID(id,region){
    return await api.Champion.masteryBySummoner(id,region)
}
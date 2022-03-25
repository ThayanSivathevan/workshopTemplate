const {LolApi} = require("twisted")
const api = new LolApi(require("../constants/constants.json").API_KEY)
const champions = require("../constants/champions.json")
const sums = require("../constants/summs.json")
const item = require("../constants/items.json")
const getImage = require("../util/getImage")
module.exports = (req,res,next)=>{
    summonerByIDMatches(req.userData.puuid).then(res=>{
        let matches = res.response
        let summonerMatches= []
        
        for (let i =0;i<Math.min(matches.length,10);i++){
            summonerByIDMatch(matches[i]).then((res)=>{
                let match = res.response.info
                let matchData = {participants:[],}
                match.participants.forEach((item,index)=>{
                    let temp={}
                    temp.summoner = item.summonerName
                    temp.champion = item.championName
                    if(temp.champion == "MonkeyKing") temp.champion="Wukong"
                    temp.champUrl = getImage("champion",temp.champion)
                    temp.team=item.teamId
                    matchData.participants.push(temp)
                    if(temp.summoner.toLowerCase().replace(" ","") == req.params.name.toLowerCase().replace(" ","")){
                        matchData.champion = item.championName
                        matchData.win = item.win
                        matchData.level = item.champLevel
                        matchData.champUrl = temp.champUrl
                        matchData.deaths = item.deaths
                        matchData.kills = item.kills
                        matchData.assists= item.assists
                        matchData.spellDurl = getImage("sum",sums[item["summoner1Id"]])
                        matchData.spellFurl = getImage("sum",sums[item["summoner2Id"]])
                        for(let ind=0;ind<6;ind++){
                            matchData[`item${ind}URL`] = getImage("item",item[`item${ind}`])
                        }
                    }
                })
                summonerMatches.push(matchData)
                if(i==9 || i == matches.length-1){
                    req.matches=summonerMatches
                    next()
                }
                
            }).catch((e)=>{
                if(i==9){
                    req.matches=summonerMatches
                    next()
                }
            })
            
        }
        
    }).catch((e)=>{
        console.log(e)
        res.status(401).json({error:"Summoner Does not have matches"})
    })
}


async function summonerByIDMatches(id){
    return await api.MatchV5.list(id,'AMERICAS')
}
async function summonerByIDMatch(id){
    return await api.MatchV5.get(id,'AMERICAS')
}
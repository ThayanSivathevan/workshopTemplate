const express = require("express")
const router = express.Router()
const checkIfValidSummoner = require("../middleware/checkIfValidSummoner")
const checkSummonerMastery = require("../middleware/checkSummonerMastery")
const checkSummonerRank = require("../middleware/checkSummonerRank")
const checkSummonerMatches = require("../middleware/checkSummonerMatches")
const PATH = require("../constants/constants.json").PATH
router.get("/playerData/:region/:name",checkIfValidSummoner,checkSummonerMastery,checkSummonerRank,checkSummonerMatches,(req,res)=>{
    const {userData,mastery,matches} = req

    const data ={
        userData:{
            username:req.params.name,
            region:req.params.region,
            profilePicture: `${PATH}/img/profileicon/${userData.profileIconId}.png`,
            summonerLevel:userData.summonerLevel,
            ranked:userData.ranked
        },
        mastery,
        matches
    }
    res.json(data)
})






module.exports = router
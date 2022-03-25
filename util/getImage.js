const PATH = require("../constants/constants.json").PATH
module.exports = (type,data)=>{
    switch(type){
        case "champion":
            return `${PATH}/img/champion/${data}.png`
        case "sum":
            return `${PATH}/img/spell/${data}.png`
        case "item":
            return `${PATH}/img/item/${data}.png`
    }
}
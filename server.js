var express = require("express")
var app = express()
const cors = require("cors")
const PORT = 3001

app.use(cors())

app.use(express.json())
app.use(require("./routes/routes"))

app.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})
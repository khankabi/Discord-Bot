const mongoose = require("mongoose")
mongoose.set("strictQuery",true)
async function connectionDb(url){
    return mongoose.connect(url)
}
module.exports={
    connectionDb,
}
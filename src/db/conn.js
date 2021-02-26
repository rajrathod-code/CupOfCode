const mongoose = require('mongoose');

//Creating a database
mongoose.connect("mongodb://localhost:27017/cupofcode",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    // useFindAndModify:true
}).then(()=>{
    console.log("Database connection successfull");
}).catch((e)=>{
    console.log(`ERROR IN conn.js file ${e}`);
})
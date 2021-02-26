//Requiring Pakages
const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

const hbs = require('hbs'); //We need handle bar here because we want to use partials

// Requiring Externle files here:
    require("./db/conn")

//Getting Exported :
const User = require("./models/usermessage");

//Settings new paths:
const views_path = path.join(__dirname,"../src/templates/views")
const partials_path = path.join(__dirname,"../src/templates/partials")

//Getting the path of bootstrap and jquery
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use("/minjq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));

//Let express know that data in json formate
app.use(express.urlencoded({extended:false}));

//Let express know that we are using template engine
app.set('view engine', 'hbs');
//Set views path
app.set('views',views_path );
app.use(express.static(path.join(__dirname,"../src/templates/views/images"))); //Set the image path

//Now we have to register partials
hbs.registerPartials(partials_path);

// Routing:
app.get('/', (req, res) => {
    res.render("index");
});

app.post('/contact', async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index",{message:'Successfull'});
    } catch (error) {
        res.status(500).send(`Server is not responding : ${error}`);
    }
});

//Creating Server :
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
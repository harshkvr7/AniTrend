import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res) => {
    try {
        var response = await axios.get("https://api.jikan.moe/v4/top/anime");
        var result = response.data.data;

        res.render("index.ejs",{data : result});


    } catch (error) {
        console.error(error);
    }
})

app.post("/",async(req,res) => {
    console.log(req.body);
    var type = req.body.type;
    var filter = req.body.filter;
    try {
        var response = await axios.get(`https://api.jikan.moe/v4/top/anime/?type=${type}&filter=${filter}`);
        var result = response.data.data;

        console.log(result[0].url);

        res.render("index.ejs",{data : result});


    } catch (error) {
        console.error(error);
    }
})

app.listen(port,() => {
    console.log(`Server running at port : ${port}`);
})
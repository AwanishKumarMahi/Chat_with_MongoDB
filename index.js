const express = require("express");
const app = express();
const db = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");


app.set("view engin", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,'public')));

async function main(){
    await db.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
    .then((res)=>{
        console.log("Connection successful.");
    })
    .catch((err)=>{
        console.log(err);
    });


app.get("/", (req,res)=>{
    res.send("Root is working.");
});

app.get("/chat", async (req, res)=>{
    let chats = await Chat.find();
    res.render('index.ejs',{chats}); 
});






app.listen(8080, ()=>{
    console.log("Listening at port: 8080");
})

const express = require("express");
const app = express();
const db = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");


app.set("view engin", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));

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
    // res.send("Root is working.");
    //res.redirect("/chat");
});

app.get("/chat", async (req, res)=>{
    let chats = await Chat.find();
    res.render('index.ejs',{chats}); 
});

app.get("/chat/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/chat", (req, res)=>{
    let {sender, msg, reciver} = req.body;
    let newChat = new Chat({
        from: sender,
        to: reciver,
        msg: msg,
        created_at: new Date,
        update_at: null
    });

    newChat.save()
        .then((res) => {
            console.log("Successful insert: "+res);
        })
        .catch((err) =>{
            console.log("Failed: "+err);
        });
    
    res.redirect("/chat");
});



app.listen(8080, ()=>{
    console.log("Listening at port: 8080");
})

const express = require("express");
const app = express();
const db = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


async function main(){
    const url = "mongodb+srv://awanishkumarhot:awanish00@cluster0.bmuxter.mongodb.net/?retryWrites=true&w=majority";
    // const connetionParams ={
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
    await db.connect(url);
}

//For offline database
// async function main(){
//     await db.connect("mongodb://127.0.0.1:27017/whatsapp");
// }

main()
    .then((res)=>{
        console.log("Connection successful.");
    })
    .catch((err)=>{
        console.log(err);
    });


app.get("/", (req,res)=>{
    res.send("Root is working.");
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

app.get("/chat/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs',{chat});
});

app.put("/chat/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:msg, update_at: new Date()},{runValidators: true, new: true});
    res.redirect('/chat');
});
app.delete("/chat/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect('/chat');
});

app.listen(8080, ()=>{
    console.log("Listening at port: 8080");
})

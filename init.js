const db = require("mongoose");
const Chat = require("./models/chat.js");

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

let chats = [
    {
        from: "Awanish",
        to: "Anshu",
        msg: "Hello buddy, how are you?",
        created_at: new Date(),
        update_at: null
    },
    {
        from: "Anshu",
        to: "Awanish",
        msg: "Fine buddy, how are you?",
        created_at: new Date(),
        update_at: null
    },
    {
        from: "Awanish",
        to: "Anshu",
        msg: "Fine, what are you doing?",
        created_at: new Date(),
        update_at: null
    },
    {
        from: "Vishal",
        to: "Anshu",
        msg: "Hello, Anshu?",
        created_at: new Date(),
        update_at: null
    }
];

Chat.insertMany(chats);

const db = require("mongoose");

const chatschema = new db.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {type: String},
    created_at: {
        type: Date,
        required: true
    },
    update_at: {type: Date}
});

const chat = db.model("chat",chatschema);

module.exports = chat;


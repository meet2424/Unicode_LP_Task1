const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const multipleFilesSchema = new Schema({
    albumTitle: {
        type: String,
        required: true
    },
    files: [Object],
    artist: {
        type: String,
        required: true
    },
    username: String,
}, { timeStamps: true });

module.exports = mongoose.model("MultipleFiles", multipleFilesSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true,
    },
    values: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ConfigValues',
        }
    ],
});

module.exports = mongoose.model("Config", configSchema);
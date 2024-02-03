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
            cd: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Config", configSchema);
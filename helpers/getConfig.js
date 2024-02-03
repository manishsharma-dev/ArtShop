const Config = require("../models/config");

async function getConfigByType(type) {
    const config = await Config.findOne({ type: type });
    if (config) {
        return config.values;
    }
    return [];
}

async function getConfigById(id) {
    const config = await Config.findOne({ _id: id });
    if (config) {
        return config.values;
    }
    return [];
}


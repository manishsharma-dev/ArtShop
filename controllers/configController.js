const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Config = require("../models/config");
const ConfigValues = require("../models/configValues");
const apiResponse = require("../helpers/apiResponse");

const getMultipleConfig = catchAsyncErrors(async (req, res, next) => {
    const { configList } = req.body;
    const config = await Config.find({ type: { $in: configList } }).populate('values');
    if (!config) {
        return apiResponse.successResponseWithData(res, 'No data found for requested configs.', []);
    }
    return apiResponse.successResponseWithData(res, null, config);
})

const postNewConfig = catchAsyncErrors(async (req, res, next) => {
    const configValues = await ConfigValues.insertMany(req.body.values);
    const config = new Config(req.body);
    config.values = configValues;
    const newConfig = await config.save();
    return apiResponse.successResponseWithData(res, "Config created successfully", newConfig);
})

module.exports = {
    getMultipleConfig,
    postNewConfig
}
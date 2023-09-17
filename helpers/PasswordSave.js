const Password = require("../models/PasswordModel");

exports.PasswordSave = async function (req) {
    const password = new Password(req);
    const newPassword = await password.save().catch((err) => {return err});
    return {data : newPassword ,message: null, err: null }
}


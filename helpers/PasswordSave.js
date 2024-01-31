const Password = require("../models/PasswordModel");

exports.PasswordSave = async function (req) {
    const password = new Password(req);
    console.log(req);
    const newPassword = await password.save().catch((err) => {
        console.log(err);
        return err
    });
    return { data: newPassword, message: null, err: null }
}


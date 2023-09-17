const User = require("../models/UserModel");

exports.getUserByParam = async function (req) {
    
    try{
        const user = await User.find(req).catch((err) => {throw err});
        return user;
    }
    catch(err){
            return err;
    }    
};
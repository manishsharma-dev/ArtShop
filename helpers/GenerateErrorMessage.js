exports.generateErrorMessage = function (error) {
	let message = "";
    switch(error.code){
        case 11000:
            const keys = error.keyPattern ? Object.keys(error.keyPattern) : [];
        message = `This ${keys.join(',')} already exists in our records.`
            break;
            default : 
            message = error.message;
    }
	return message;
};
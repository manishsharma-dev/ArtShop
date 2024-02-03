exports.successResponse = function (res, msg) {
	var data = {
		status: true,
		message: msg
	};
	return res.header({ 'Content-Type': 'application/json' }).status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: true,
		message: msg,
		data: data
	};
	return res.header({ 'Content-Type': 'application/json' }).status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
		data: null
	};
	return res.header({ 'Content-Type': 'application/json' }).status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
		data: null
	};
	return res.header({ 'Content-Type': 'application/json' }).status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: false,
		message: msg,
		data: data
	};
	return res.header({ 'Content-Type': 'application/json' }).status(400).json(resData);
};

exports.unauthorizedResponse = function (res, code, msg) {
	var data = {
		status: false,
		message: msg,
		data: null
	};
	res.header({ 'Content-Type': 'application/json' }).status(code).json(data);
};


const sendLoginResponse = (user, statusCode, res) => {
    const token = user.getJwtToken();

    //option for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true;
    // }
    const responseData = { userData: user, token: { accessToken: token } };
    res.status(statusCode).cookie('token', token, options)
        .json({
            status: true,
            message: "Login Successful",
            data: responseData
        })

}

module.exports = sendLoginResponse;
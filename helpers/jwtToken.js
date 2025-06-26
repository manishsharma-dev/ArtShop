

const sendLoginResponse = async(user, statusCode, res) => {
    const token = user.getJwtToken();
    const refreshToken = user.getRefreshToken();
    //option for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true ,
        secure: true,
        sameSite: 'None',
    }
    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true;
    // }
    user.refreshToken = refreshToken;
    await user.save();
    const responseData = { userData: user, token: { accessToken: token } };
    res.status(statusCode).cookie('token', refreshToken, options)
        .json({
            status: true,
            message: "Login Successful",
            data: responseData
        })

}

module.exports = sendLoginResponse;
export const getToken = (user, statusCode, res, message) => {

    const tkn = user.getJwtToken()

    const option = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRY_DATE * 24 * 60 * 60 * 1000)
        )
    }
    res.status(statusCode).cookie("token", tkn, option).json({
        success: true,
        user,
        message,
        tkn
    })
}

//USER SUCCESSFULLY REACHED TO PRIVATE DATA
exports.getPrivateData = (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            data: `${req.user.username} reached private route`
        })
    }
}
exports.getPrivateData = (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            data: 'U reached private route'
        })
    }
}
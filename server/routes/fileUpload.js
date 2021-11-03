const { singleFileUpload, getAllSingleFiles, multipleFilesUpload, getAllMultipleFiles } = require('../controllers/fileUploader')
const { protected } = require("../middleware/protected")

const { upload } = require("../config/multer");

const router = require('express').Router();

// ============================ARTIST ROUTE=======================
router.get('/artist', protected, (req, res) => {
    try {
        if (req.user.role === 'artist') {
            res.status(200).json({
                success: true,
                username: req.user.username
            })
        }
        else {
            res.status(200).json({
                success: false
            })
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }

})
router.get('/user', protected, (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                success: true,
                username: req.user.username
            })
        }
        else {
            res.status(200).json({
                success: false
            })
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }

})

//===========SINGEFILE===========
router.get('/getAllSingleFiles', getAllSingleFiles);

router.post('/singleFileUpload', upload.single("file"), singleFileUpload);

//===========MULTIPLEFILE=========
router.get('/getAllMultipleFiles', getAllMultipleFiles);

router.post('/multipleFilesUpload', upload.array("files"), multipleFilesUpload);

module.exports = router;